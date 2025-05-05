from flask import Flask, request, jsonify
from flask_cors import CORS
from ytmusicapi import YTMusic
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize YTMusic API
ytmusic = YTMusic()

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    
    try:
        # Search for songs only
        results = ytmusic.search(query, filter="songs", limit=10)
        
        # Format the response
        songs = []
        for item in results:
            if item['resultType'] == 'song':
                song = {
                    'id': item['videoId'],
                    'title': item['title'],
                    'artist': item['artists'][0]['name'] if item['artists'] else 'Unknown Artist',
                    'album': item['album']['name'] if 'album' in item and item['album'] else '',
                    'thumbnailUrl': item['thumbnails'][-1]['url'] if item['thumbnails'] else '',
                    'duration': item['duration'] if 'duration' in item else '',
                }
                songs.append(song)
        
        return jsonify(songs)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/featured', methods=['GET'])
def featured():
    try:
        # Get featured playlists or charts
        charts = ytmusic.get_charts(limit=10)
        
        # Format the response
        featured_items = []
        if 'trending' in charts:
            for item in charts['trending']['items'][:8]:
                featured_item = {
                    'id': item['videoId'],
                    'title': item['title'],
                    'artist': item['artists'][0]['name'] if item['artists'] else 'Unknown Artist',
                    'thumbnailUrl': item['thumbnails'][-1]['url'] if item['thumbnails'] else '',
                    'type': 'trending'
                }
                featured_items.append(featured_item)
        
        return jsonify(featured_items)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)