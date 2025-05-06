import React from 'react'
import { NavLink } from 'react-router-dom'

const activeStyle = {
  fontWeight: 'bold',
  color: '#0070f3',
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    
    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-blue-600 font-bold text-xl">ParcelDelivery</span>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-500 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <NavItem to="/" label="Home" active={true} />
              <NavItem to="/about" label="About Us" />
              <NavItem to="/services" label="Services" />
              <NavItem to="/track" label="Track Parcel" />
              <NavItem to="/book" label="Book Delivery" />
              <NavItem to="/contact" label="Contact" />
              <NavItem to="/admin" label="Admin Panel" />
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <MobileNavItem to="/" label="Home" active={true} />
                <MobileNavItem to="/about" label="About Us" />
                <MobileNavItem to="/services" label="Services" />
                <MobileNavItem to="/track" label="Track Parcel" />
                <MobileNavItem to="/book" label="Book Delivery" />
                <MobileNavItem to="/contact" label="Contact" />
                <MobileNavItem to="/admin" label="Admin Panel" />
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
  
  // Desktop Nav Item
  function NavItem({ to, label, active }) {
    return (
      <a 
        href={to} 
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          active 
            ? 'text-blue-600 font-semibold' 
            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
        }`}
      >
        {label}
      </a>
    );
  }
  
  // Mobile Nav Item
  function MobileNavItem({ to, label, active }) {
    return (
      <a 
        href={to} 
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          active 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
        }`}
      >
        {label}
      </a>
    );
  }