import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home/HomePage'
import GalleryPage from './pages/Gallery/GalleryPage'
import NewsPage from './pages/News/NewsPage'
import AboutPage from './pages/About/AboutPage'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'
import { AudioProvider } from './contexts/AudioContext'
import { SmoothScrollProvider } from './contexts/SmoothScrollContext'
import './App.css'

/**
 * Main App Component
 * Sets up routing for the application using React Router
 */
function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <SmoothScrollProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage key="home" />} />
              <Route path="gallery" element={<GalleryPage key="gallery" />} />
              <Route path="news" element={<NewsPage key="news" />} />
              <Route path="about" element={<AboutPage key="about" />} />
            </Route>
          </Routes>
          <AudioPlayer />
        </SmoothScrollProvider>
      </BrowserRouter>
    </AudioProvider>
  )
}

export default App