import React from 'react';
import { NavLink } from 'react-router-dom';

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
            <NavLink to="/" className={({isActive}) => 
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }>
              Home
            </NavLink>
            <NavLink to="/about" className={({isActive}) => 
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }>
              About Us
            </NavLink>
            <NavLink to="/services" className={({isActive}) => 
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }>
              Services
            </NavLink>
            <NavLink to="/track" className={({isActive}) => 
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }>
              Track Parcel
            </NavLink>
            <NavLink to="/book" className={({isActive}) => 
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }>
              Book Delivery
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => 
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }>
              Contact
            </NavLink>
            
          </div>
        </div>
         
        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`
              }>
                Home
              </NavLink>
              <NavLink to="/about" className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`
              }>
                About Us
              </NavLink>
              <NavLink to="/services" className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`
              }>
                Services
              </NavLink>
              <NavLink to="/track" className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`
              }>
                Track Parcel
              </NavLink>
              <NavLink to="/book" className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`
              }>
                Book Delivery
              </NavLink>
              <NavLink to="/contact" className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`
              }>
                Contact
              </NavLink>
             
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}