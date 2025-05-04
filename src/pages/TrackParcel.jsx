import React, { useEffect, useState } from 'react'
import { findBookingByTrackingNumber } from '../utils/localStorage';

export default function TrackParcel() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [recentTracking, setRecentTracking] = useState([]);
  

    useEffect(() => {
        const storedRecentTracking = JSON.parse(localStorage.getItem('recent_tracking') || '[]');
        setRecentTracking(storedRecentTracking);
      }, []);
    
    const saveRecentTracking = (number) => {
    // Only add if it's not already in the list
    if (!recentTracking.includes(number)) {
        const updated = [number, ...recentTracking].slice(0, 5); // Keep only 5 most recent
        setRecentTracking(updated);
        localStorage.setItem('recent_tracking', JSON.stringify(updated));
    }
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        
        const trimmedNumber = trackingNumber.trim();
        const result = findBookingByTrackingNumber(trimmedNumber);
        
        if (result) {
          setStatus({
            status: result.status,
            details: getStatusDetails(result)
          });
          saveRecentTracking(trimmedNumber);
        } else {
          setStatus(null);
          setError('Tracking number not found. Please check and try again.');
        }
      }

      function getStatusDetails(booking) {
        switch(booking.status) {
          case 'Pending':
            return 'Your package is being processed for delivery.';
          case 'In Transit':
            return `Your package is on its way to ${booking.recipientAddress}.`;
          case 'Delivered':
            return `Successfully delivered on ${formatDate(booking.updatedAt)}.`;
          case 'Cancelled':
            return 'This delivery has been cancelled.';
          default:
            return 'Status information is being updated.';
        }
      }
      function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      function handleRecentTrackingClick(number) {
        setTrackingNumber(number);
        // Immediately search for this tracking number
        const result = findBookingByTrackingNumber(number);
        if (result) {
          setStatus({
            status: result.status,
            details: getStatusDetails(result)
          });
          setError(null);
        } else {
          setStatus(null);
          setError('Tracking number not found. Please check and try again.');
        }
      }
  
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Track Your Parcel</h2>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={e => setTrackingNumber(e.target.value)}
                  required
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Track
                </button>
              </div>
            </form>
  
            {status && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-blue-800">Status: {status.status}</h3>
                  <p className="mt-1 text-blue-700">{status.details}</p>
                </div>
              </div>
            </div>
          )}
  
            {error && (
              <div className="mt-8 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}
            
            {recentTracking.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recently Tracked</h3>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recentTracking.map(number => (
                  <button
                    key={number}
                    onClick={() => handleRecentTrackingClick(number)}
                    className="px-3 py-2 bg-gray-100 rounded text-gray-800 text-center hover:bg-gray-200 transition-colors"
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Bookings</h3>
            <p className="text-gray-600">
              <a href="#" className="text-blue-600 hover:underline">
                Log in to view your bookings and tracking numbers
              </a>
            </p>
          </div>
          </div>
        </div>
      </div>
    );
  }