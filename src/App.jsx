
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import BookDelivery from './pages/BookDelivery'
import Contact from './pages/Contact'
import AdminPanel from './pages/AdminPanel'
import TrackParcel from './pages/TrackParcel'

function App() {

  return (
    <Router className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main  className="flex-grow container mx-auto px-4 py-8" style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/track" element={<TrackParcel />} />
          <Route path="/book" element={<BookDelivery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
