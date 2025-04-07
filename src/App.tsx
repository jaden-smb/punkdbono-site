import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home/HomePage'
import GalleryPage from './pages/Gallery/GalleryPage'
import BlogPage from './pages/Blog/BlogPage'
import NewsPage from './pages/News/NewsPage'
import AboutPage from './pages/About/AboutPage'
import './styles/global.css'

/**
 * Main App Component
 * Sets up routing for the application using React Router
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App