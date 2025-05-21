# Osvia Music Streaming App

<p align="center">
  <img src="public/osvia.svg" alt="Osvia Logo" width="300">
</p>

Osvia is a modern web-based music streaming application that integrates with YouTube Music to provide seamless music discovery and playback. It features a sleek dark AMOLED theme, audio visualizations, and a fully responsive design for both desktop and mobile experiences.

## Features

### Music Playback
- **Streaming Integration**: Connects to YouTube Music via ytmusicapi to stream high-quality audio
- **Visualizer**: Real-time audio visualization using Web Audio API
- **Player Controls**: Complete playback controls including play/pause, skip, volume, and progress tracking

### Music Discovery
- **Search**: Find songs, albums, and artists with integrated search functionality
- **Featured Content**: Discover trending and recommended music on the homepage
- **Music Queue**: Build and manage your listening queue with drag-and-drop functionality

### User Interface
- **Dark AMOLED Theme**: Eye-friendly interface with rich blacks and vibrant accent colors
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Customizable Layout**: Resizable sidebar for personalized viewing experience
- **Queue Management**: View and rearrange your upcoming tracks

## Tech Stack

### Frontend
- **React**: UI library for building component-based interfaces
- **TypeScript**: Type-safe JavaScript for better code quality and developer experience
- **Vite**: Modern build tool for fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icons library for clean, consistent UI elements

### Audio Processing
- **Web Audio API**: For real-time audio processing and visualization
- **Media Elements**: Native audio elements for reliable playback

### Integration
- **ytmusicapi**: Python library for YouTube Music API integration
- **yt-dlp**: Library for extracting audio streams from YouTube

### State Management
- **React Context API**: For global state management
- **Custom Hooks**: For encapsulated business logic

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

3. Start the backend server:
   ```bash
   python main.py
   ```

## Usage

### Navigation
- Use the sidebar to navigate between different sections of the app
- Search for music using the search bar
- Browse featured content on the homepage

### Playing Music
- Click on any song to play it immediately
- Add songs to your queue by using the context menu
- Control playback using the player at the bottom of the screen
- View and manage your queue using the queue sidebar

### Customization
- Resize the sidebar by dragging its edge
- Collapse the sidebar for more viewing space on mobile devices
- Adjust volume and toggle mute as needed

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
- All the open-source libraries that made this project possible

## Contact

For questions, features or issues please open an issue on the repository or contact the maintainers directly.
