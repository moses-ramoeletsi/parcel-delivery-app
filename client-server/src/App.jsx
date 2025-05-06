import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import BookDelivery from './pages/BookDelivery';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import TrackParcel from './pages/TrackParcel';
import ProtectedRoute from './components/ProtectedRoute';
import { initializeLocalStorage, isAdminLoggedIn } from './utils/localStorage';

// Layout component to handle conditional navbar rendering
function AppLayout() {
  const location = useLocation();
  const [adminAuth, setAdminAuth] = useState(isAdminLoggedIn());
  
  // Update auth state when location changes
  useEffect(() => {
    setAdminAuth(isAdminLoggedIn());
  }, [location]);
  
  // Don't show any navbar on login page
  const isLoginPage = location.pathname === '/admin-login';
  // Show admin navbar on admin panel
  const isAdminPage = location.pathname === '/admin';
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {!isLoginPage && (isAdminPage ? <AdminNavbar /> : <Navbar />)}
      
      <main className="flex-grow container mx-auto px-4 py-8" style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/track" element={<TrackParcel />} />
          <Route path="/book" element={<BookDelivery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  // Initialize localStorage when app loads
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;