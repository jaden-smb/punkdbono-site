# PunkDBono Website

A React-based website for the PunkDBono band, featuring media galleries, news, and information about the band. Built for Santiago Montoya.

## Features

- Interactive 3D models using React Three Fiber
- Audio player for music samples
- Image gallery with band photos
- Smooth scrolling experience
- Responsive design for mobile and desktop devices

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router DOM 7
- **3D Rendering**: Three.js with React Three Fiber & Drei
- **Animation**: GSAP
- **Smooth Scrolling**: Lenis
- **Image Processing**: Sharp for image optimization

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd punkdbono-site
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173/`.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This command:
1. Compiles TypeScript
2. Builds the Vite application
3. Creates a 404.html page from index.html for SPA routing
4. Outputs to the `dist` directory

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

- `/public`: Static assets including images, 3D models, and music files
- `/src`: Source code
  - `/components`: Reusable UI components
  - `/contexts`: React context providers
  - `/hooks`: Custom React hooks
  - `/layouts`: Page layout components
  - `/pages`: Main page components
  - `/styles`: Global styles and CSS variables
  - `/utils`: Utility functions

## Additional Scripts

- `npm run lint`: Run ESLint to check code quality
- `npm run minify-css`: Post-process and minify CSS for production

## Deployment

The site is configured for deployment on platforms that support SPA routing (Netlify, Vercel, etc.)

## Credits

This project was created for Santiago Montoya as part of a band website development initiative. The website showcases PunkDBono's music, media, and band information in an interactive and engaging format.
