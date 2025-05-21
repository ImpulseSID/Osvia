# Osvia Music Streaming App

<p align="center">
  <img src="public/osvia.svg" alt="Osvia Logo" width="300">
</p>

Osvia is a modern web-based music streaming application that integrates with YouTube Music to provide seamless music discovery and playback. It features a sleek dark AMOLED theme, audio visualizations, time-synced lyrics, and a fully responsive design for both desktop and mobile experiences.

## Features

### Music Playback

- **Streaming Integration**: Connects to YouTube Music via ytmusicapi to stream high-quality audio
- **Visualizer**: Real-time audio visualization using Web Audio API
- **Player Controls**: Complete playback controls including play/pause, skip, volume, and progress tracking
- **Time-Synced Lyrics**: Follow along with synchronized lyrics as the music plays

### Music Discovery

- **Search**: Find songs, albums, and artists with integrated search functionality
- **Featured Content**: Discover trending and recommended music on the homepage
- **Music Queue**: Build and manage your listening queue with drag-and-drop functionality
- **Marquee Text**: Long song titles and artist names scroll when hovered, ensuring complete visibility

### User Interface

- **Dark AMOLED Theme**: Eye-friendly interface with rich blacks and vibrant accent colors
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Customizable Layout**: Resizable sidebar for personalized viewing experience
- **Queue Management**: View and rearrange your upcoming tracks
- **Dual Sidebar Design**: Main navigation sidebar on the left, queue management on the right

## Tech Stack

### Frontend

- **React**: UI library for building component-based interfaces
- **TypeScript**: Type-safe JavaScript for better code quality and developer experience
- **Vite**: Modern build tool for fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icons library for clean, consistent UI elements
- **React Router**: For client-side routing and navigation

### Audio Processing

- **Web Audio API**: For real-time audio processing and visualization
- **Media Elements**: Native audio elements for reliable playback
- **Audio Context**: For spectrum analysis and visualizer effects

### State Management

- **React Context API**: For global state management
- **Custom Hooks**: For encapsulated business logic

### Drag and Drop

- **@dnd-kit**: Library for drag and drop functionality in the queue

### Integration

- **ytmusicapi**: Python library for YouTube Music API integration
- **yt-dlp**: Library for extracting audio streams from YouTube

## Setup & Installation

### Prerequisites

- Node.js (v14 or newer)
- Python (v3.7 or newer) for the backend services

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/osvia.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup (required for music streaming)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

Note: Both Backend and Frontend start with "npm run dev" using "concurrently" so no need to start backend separately.

## Usage

### Navigation

- Use the sidebar to navigate between different sections of the app
- Search for music using the search bar
- Browse featured content on the homepage
- View time-synced lyrics with the lyrics button in the player

### Playing Music

- Click on any song to play it immediately
- Add songs to your queue by using the context menu
- Control playback using the player at the bottom of the screen
- View and manage your queue using the queue sidebar
- Follow along with lyrics by clicking the lyrics button

### Customization

- Resize the sidebar by dragging its edge
- Collapse the sidebar for more viewing space on mobile devices
- Adjust volume and toggle mute as needed
- Hover over long text to see it scroll horizontally

## Application Structure

### Main Components

- **Layout**: Main application layout with resizable sidebar
- **MusicPlayer**: Audio playback with controls and visualization
- **Sidebar**: Navigation menu for different sections
- **QueueSidebar**: Drag-and-drop queue management
- **LyricsPage**: Time-synced lyrics display

### Pages

- **HomePage**: Featured and recommended music
- **SearchPage**: Search results and filtering
- **LyricsPage**: Display synchronized lyrics

### Contexts

- **MusicPlayerContext**: Global state for audio playback

## Contributing

Contributions to Osvia are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ytmusicapi](https://github.com/sigma67/ytmusicapi) - For YouTube Music API integration
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - For audio extraction capabilities
- [dnd-kit](https://dndkit.com/) - For drag and drop functionality
- All the open-source libraries that made this project possible

## Contact

For questions, features or issues please open an issue on the repository or contact the maintainers directly.
