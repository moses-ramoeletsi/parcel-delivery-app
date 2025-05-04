import React from 'react'

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ParcelDelivery</h3>
              <p className="text-gray-300">Your trusted partner for nationwide parcel delivery and shopping services.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/book" className="text-gray-300 hover:text-white">Book Delivery</a></li>
                <li><a href="/track" className="text-gray-300 hover:text-white">Track Parcel</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-white">Our Services</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">Phone: +266 123 4567</p>
              <p className="text-gray-300">Email: info@parceldelivery.co.ls</p>
              <p className="text-gray-300">Working Hours: Mon - Fri, 8:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">© 2025 Parcel Delivery Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  