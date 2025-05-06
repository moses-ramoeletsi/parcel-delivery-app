import React from 'react'

export default function Services() {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h2>
        
        <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
          <div className="px-6 py-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Parcel Delivery (Nationwide)</h3>
            <p className="text-gray-700 mb-4">
              We deliver parcels across the country quickly and safely, with options for 
              standard or express delivery based on your needs.
            </p>
            <div className="flex items-center mt-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-gray-700">Reliable tracking system</p>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-gray-700">Coverage to all districts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
          <div className="px-6 py-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Shopping Services</h3>
            <p className="text-gray-700 mb-4">
              Need something purchased and delivered? We've got you covered with our convenient 
              shopping services.
            </p>
            <div className="flex items-center mt-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-gray-700">Purchase and delivery of items</p>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-gray-700">Time-saving convenience</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-6 py-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing Information</h3>
            <p className="text-gray-700">
              Pricing varies based on parcel size, weight, and destination. Contact us for a 
              custom quote or visit our office.
            </p>
            <div className="mt-6 inline-block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  