import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home/HomePage'
import GalleryPage from './pages/Gallery/GalleryPage'
import NewsPage from './pages/News/NewsPage'
import AboutPage from './pages/About/AboutPage'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'
import { AudioProvider } from './contexts/AudioContext'
import './App.css'

/**
 * Main App Component
 * Sets up routing for the application using React Router
 */
function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
        <AudioPlayer />
      </BrowserRouter>
    </AudioProvider>
  )
}

export default App