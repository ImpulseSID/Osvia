from fastapi import FastAPI, Query, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from ytmusicapi import YTMusic
import subprocess
import httpx

app = FastAPI()

# Allow CORS from your frontend origin (change to your deployed frontend URL in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ytmusic = YTMusic()

def transform_song(song):
    return {
        "id": song.get("videoId"),
        "videoId": song.get("videoId"),
        "title": song.get("title"),
        "artist": ", ".join([artist["name"] for artist in song.get("artists", [])]) if song.get("artists") else "",
        "thumbnail": song.get("thumbnails", [{}])[-1].get("url", ""),
        "duration": song.get("duration"),
    }

@app.get("/api/search")
def search_music(q: str = Query(..., min_length=1)):
    try:
        results = ytmusic.search(q, filter="songs")
        transformed = [transform_song(song) for song in results[:20]]
        return transformed
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search error: {e}")

@app.get("/api/featured")
def featured_music():
    try:
        popular_queries = ["Top Hits 2024", "Pop Music", "Rock Classics"]
        results = []
        for query in popular_queries:
            search_results = ytmusic.search(query, filter="songs")[:5]
            items = [transform_song(song) for song in search_results]
            results.append({"title": query, "items": items})
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Featured music error: {e}")

from fastapi.responses import JSONResponse

@app.get("/api/stream/{video_id}")
def get_stream_url(video_id: str):
    import subprocess

    ytdlp_command = [
        "yt-dlp",
        "-f", "bestaudio[ext=m4a]/bestaudio",
        "-g",
        f"https://www.youtube.com/watch?v={video_id}"
    ]

    try:
        result = subprocess.run(
            ytdlp_command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=10  # ⏱ limit to 10 seconds
        )

        if result.returncode != 0:
            return JSONResponse(
                status_code=500,
                content={
                    "error": "yt-dlp failed",
                    "details": result.stderr
                }
            )

        url = result.stdout.strip()
        return {"url": url}

    except subprocess.TimeoutExpired:
        return JSONResponse(
            status_code=504,
            content={"error": "yt-dlp timed out"}
        )

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"Unexpected error: {str(e)}"}
        )


@app.get("/api/audio-proxy/{video_id}")
def proxy_stream(video_id: str):
    try:
        # Step 1: Get the direct stream URL via yt-dlp
        ytdlp_command = [
            "yt-dlp",
            "-f", "bestaudio[ext=m4a]/bestaudio",
            "-g",
            f"https://www.youtube.com/watch?v={video_id}"
        ]

        result = subprocess.run(
            ytdlp_command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=10
        )

        if result.returncode != 0:
            raise RuntimeError(result.stderr.strip())

        stream_url = result.stdout.strip()

        # Step 2: Open and stream the audio content
        async def stream_audio():
            async with httpx.AsyncClient(timeout=None) as client:
                async with client.stream("GET", stream_url, headers={"User-Agent": "Mozilla/5.0"}) as r:
                    async for chunk in r.aiter_bytes(chunk_size=1024):
                        yield chunk

        return StreamingResponse(stream_audio(), media_type="audio/mp4")

    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="yt-dlp timed out")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Proxy error: {str(e)}")
