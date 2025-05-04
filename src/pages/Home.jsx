import React from 'react'

export default function Home({ setActivePage }) {
    function FeatureCard({ title, description, icon }) {
        return (
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <div className="h-6 w-6 text-white">{icon}</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-base text-gray-500">{description}</p>
              </div>
            </div>
          </div>
        );
      }
      
      // Simple icons for the feature cards
      function BoxIcon() {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      }
      
      function SpeedIcon() {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      }
      
      function ShieldIcon() {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      }
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Fast & Reliable Parcel Delivery
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Your trusted partner for nationwide parcel delivery and shopping services.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button 
                onClick={() => setActivePage('book')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Book Delivery
              </button>
              <button 
                onClick={() => setActivePage('track')}
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Track Package
              </button>
            </div>
          </div>
          
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <FeatureCard 
                title="Nationwide Coverage" 
                description="We deliver to all districts and remote areas across the country."
                icon={<BoxIcon />}
              />
              <FeatureCard 
                title="Fast Delivery" 
                description="Get your parcels delivered quickly with our express service."
                icon={<SpeedIcon />}
              />
              <FeatureCard 
                title="Secure Handling" 
                description="Your parcels are handled with care and tracked throughout delivery."
                icon={<ShieldIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }