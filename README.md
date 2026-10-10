# Fitness App

A polished, installable fitness Progressive Web App (PWA) designed for Christopher in George, South Africa. Built for running, trail running, weightlifting, and mobility training.

**Live App:** [https://christopheralberts.github.io/fitness-app/](https://christopheralberts.github.io/fitness-app/)

## Features

### Main Screens

- **Today** - View your next scheduled session from the active program, quick start options for different workout types, and weekly stats summary
- **Programs Library** - Browse and start training programs:
  - Road Running (Couch to 5K, 10K Improver, Half Marathon Builder)
  - Trail Running (Trail Introduction, Hill Strength Builder, Technical Downhill, Back-to-Back Long Runs)
  - Weightlifting (Beginner Full Body, Upper/Lower Split, Strength for Runners)
  - Mobility/Stretching (Pre-Run Warm-up, Post-Run Stretches, Hip & Ankle Mobility, Full Body Mobility)
- **Exercise Library** - Searchable and filterable exercise database with:
  - Categories: Upper Body, Lower Body, Core, Cardio, Stretches
  - SVG illustrations for every exercise showing proper form
  - "Watch How-to Video" links to reputable YouTube instructional videos
  - Each exercise includes how-to steps, cues, and common mistakes
- **Workout Player** - Interactive workout execution with:
  - Timer for intervals, holds, and rest periods
  - Set/rep/weight logging
  - Progress tracking through workouts
- **Progress** - Track your fitness journey:
  - Current workout streak
  - Weekly volume chart
  - Running distance chart
  - Workout history

### PWA Features

- **Installable** - Add to home screen on mobile devices
- **Offline Support** - Works without internet after first load
- **Dark/Light Mode** - Automatic theme with manual toggle
- **Mobile-First Design** - Optimized for phone usage
- **Local Data Storage** - All data stored on device (no backend required)

## Tech Stack

- Vanilla JavaScript (no frameworks)
- CSS3 with CSS Custom Properties
- Service Worker for offline caching
- LocalStorage for data persistence
- SVG icons and illustrations

## Project Structure

```
fitness-app/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── css/
│   ├── styles.css     # Main styles
│   └── components.css # Component styles
├── js/
│   ├── app.js         # Main application logic
│   ├── data.js        # Exercise and program data
│   └── storage.js     # LocalStorage management
├── icons/
│   ├── icon-*.png     # App icons (various sizes)
│   └── icon-maskable-*.png  # Maskable icons
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Pages deployment
```

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/christopheralberts/fitness-app.git
   cd fitness-app
   ```

2. Start a local server (required for Service Worker):
   ```bash
   # Using Python
   python -m http.server 8080
   
   # Or using Node.js
   npx serve
   ```

3. Open in browser: `http://localhost:8080/fitness-app/`

## Enabling GitHub Pages

To deploy this app to GitHub Pages:

1. Go to your repository Settings
2. Navigate to **Pages** in the sidebar
3. Under **Build and deployment**:
   - Source: **GitHub Actions**
4. The app will automatically deploy on push to `main`

## Attribution

- Exercise illustrations: Original SVG artwork created for this app
- How-to videos: Links to reputable YouTube fitness channels

## License

MIT License - Feel free to use and modify for your own fitness tracking needs.
