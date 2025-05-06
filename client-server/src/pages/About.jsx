import React from 'react'

export default function About() {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-6 py-5">
            <p className="text-gray-700 mb-4">
              Founded in 2010, Parcel Delivery Company has grown to become a leading provider 
              of parcel delivery services nationwide.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Mission & Vision</h3>
            <p className="text-gray-700 mb-4">
              Our mission is to provide fast, secure, and affordable parcel delivery services 
              that connect people and businesses across the country. We envision a world where 
              sending and receiving parcels is seamless and hassle-free.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Contact Details & Working Hours</h3>
            <div className="bg-gray-50 rounded-md p-4">
              <p className="text-gray-700">Phone: +266 123 4567</p>
              <p className="text-gray-700">Email: info@parceldelivery.co.ls</p>
              <p className="text-gray-700">Working Hours: Mon - Fri, 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  