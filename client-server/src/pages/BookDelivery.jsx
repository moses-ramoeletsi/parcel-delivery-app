import React, { useState } from 'react'
import { saveBooking } from '../utils/localStorage';

export default function BookDelivery() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    senderEmail: '',
    recipientName: '',
    recipientAddress: '',
    recipientPhone: '',
    parcelDescription: '',
    weight: '',
    dimensions: '',
    preferredDate: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Save booking to localStorage
    const result = saveBooking(formData);
    setBookingResult(result);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">Booking Confirmed!</h3>
              <p className="mt-2 text-green-700">
                Thank you, {formData.senderName}. Your parcel delivery booking has been received.
              </p>
              <p className="mt-2 text-green-700">
                Your tracking number: <span className="font-bold">{bookingResult?.trackingNumber}</span>
              </p>
              <p className="mt-2 text-green-700">
                Please save this tracking number to follow the status of your delivery.
              </p>
              <div className="mt-4">
                <button 
                  onClick={() => window.location.href = `/track?number=${bookingResult?.trackingNumber}`}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Track Your Parcel
                </button>
                <button 
                  onClick={() => {
                    setFormData({
                      senderName: '',
                      senderAddress: '',
                      senderPhone: '',
                      senderEmail: '',
                      recipientName: '',
                      recipientAddress: '',
                      recipientPhone: '',
                      parcelDescription: '',
                      weight: '',
                      dimensions: '',
                      preferredDate: '',
                    });
                    setSubmitted(false);
                    setBookingResult(null);
                  }}
                  className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Book Another Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Book a Delivery</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sender Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-1">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    placeholder="Full Name"
                    value={formData.senderName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    id="senderEmail"
                    name="senderEmail"
                    placeholder="Email Address"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="senderPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Sender Phone
                  </label>
                  <input
                    type="tel"
                    id="senderPhone"
                    name="senderPhone"
                    placeholder="Phone Number"
                    value={formData.senderPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="senderAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Sender Address
                  </label>
                  <input
                    type="text"
                    id="senderAddress"
                    name="senderAddress"
                    placeholder="Complete Address"
                    value={formData.senderAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recipient Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    placeholder="Full Name"
                    value={formData.recipientName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="recipientPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Phone
                  </label>
                  <input
                    type="tel"
                    id="recipientPhone"
                    name="recipientPhone"
                    placeholder="Phone Number"
                    value={formData.recipientPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    id="recipientAddress"
                    name="recipientAddress"
                    placeholder="Complete Address"
                    value={formData.recipientAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Parcel Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    id="weight"
                    name="weight"
                    placeholder="Weight in kg"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">
                    Dimensions (LxWxH cm)
                  </label>
                  <input
                    type="text"
                    id="dimensions"
                    name="dimensions"
                    placeholder="e.g., 30x20x15"
                    value={formData.dimensions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="parcelDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Parcel Description
                  </label>
                  <textarea
                    id="parcelDescription"
                    name="parcelDescription"
                    placeholder="Include contents, fragility, special handling requirements, etc."
                    value={formData.parcelDescription}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Pickup Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    min={new Date().toISOString().split('T')[0]} // Ensures only future dates
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-sm transition duration-150 ease-in-out"
              >
                Book Delivery
              </button>
              <p className="text-sm text-gray-500 mt-3 text-center">
                By booking a delivery, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}