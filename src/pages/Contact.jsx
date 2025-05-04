import React, { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });
    const [submitted, setSubmitted] = useState(false);
  
    function handleChange(e) {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      // Normally send email or save inquiry
      setSubmitted(true);
    }
  
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">+266 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">info@parceldelivery.co.ls</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">Mon - Fri, 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                <div className="text-gray-500">Map View</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Send us a message</h3>
              
              {submitted ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-green-700">
                        Thank you for your inquiry. We will get back to you shortly.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Send
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }