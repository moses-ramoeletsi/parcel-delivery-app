// import React, { useEffect, useState } from 'react'
// import { findBookingByTrackingNumber } from '../utils/localStorage';

// export default function TrackParcel() {
//     const [trackingNumber, setTrackingNumber] = useState('');
//     const [status, setStatus] = useState(null);
//     const [error, setError] = useState(null);
//     const [recentTracking, setRecentTracking] = useState([]);
  

//     useEffect(() => {
//         const storedRecentTracking = JSON.parse(localStorage.getItem('recent_tracking') || '[]');
//         setRecentTracking(storedRecentTracking);
//       }, []);
    
//     const saveRecentTracking = (number) => {
//     // Only add if it's not already in the list
//     if (!recentTracking.includes(number)) {
//         const updated = [number, ...recentTracking].slice(0, 5); // Keep only 5 most recent
//         setRecentTracking(updated);
//         localStorage.setItem('recent_tracking', JSON.stringify(updated));
//     }
//     };
    
//     function handleSubmit(e) {
//         e.preventDefault();
//         setError(null);
        
//         const trimmedNumber = trackingNumber.trim();
//         const result = findBookingByTrackingNumber(trimmedNumber);
        
//         if (result) {
//           setStatus({
//             status: result.status,
//             details: getStatusDetails(result)
//           });
//           saveRecentTracking(trimmedNumber);
//         } else {
//           setStatus(null);
//           setError('Tracking number not found. Please check and try again.');
//         }
//       }

//       function getStatusDetails(booking) {
//         switch(booking.status) {
//           case 'Pending':
//             return 'Your package is being processed for delivery.';
//           case 'In Transit':
//             return `Your package is on its way to ${booking.recipientAddress}.`;
//           case 'Delivered':
//             return `Successfully delivered on ${formatDate(booking.updatedAt)}.`;
//           case 'Cancelled':
//             return 'This delivery has been cancelled.';
//           default:
//             return 'Status information is being updated.';
//         }
//       }
//       function formatDate(dateString) {
//         const date = new Date(dateString);
//         return date.toLocaleString('en-US', {
//           month: 'short',
//           day: 'numeric',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         });
//       }
//       function handleRecentTrackingClick(number) {
//         setTrackingNumber(number);
//         // Immediately search for this tracking number
//         const result = findBookingByTrackingNumber(number);
//         if (result) {
//           setStatus({
//             status: result.status,
//             details: getStatusDetails(result)
//           });
//           setError(null);
//         } else {
//           setStatus(null);
//           setError('Tracking number not found. Please check and try again.');
//         }
//       }
  
//     return (
//       <div className="max-w-2xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6">Track Your Parcel</h2>
        
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="px-6 py-8">
//             <form onSubmit={handleSubmit}>
//               <div className="flex flex-col md:flex-row gap-4">
//                 <input
//                   type="text"
//                   placeholder="Enter tracking number"
//                   value={trackingNumber}
//                   onChange={e => setTrackingNumber(e.target.value)}
//                   required
//                   className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <button 
//                   type="submit" 
//                   className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Track
//                 </button>
//               </div>
//             </form>
  
//             {status && (
//             <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-lg font-medium text-blue-800">Status: {status.status}</h3>
//                   <p className="mt-1 text-blue-700">{status.details}</p>
//                 </div>
//               </div>
//             </div>
//           )}
  
//             {error && (
//               <div className="mt-8 bg-red-50 border border-red-200 rounded-md p-4">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-red-800">{error}</h3>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {recentTracking.length > 0 && (
//             <div className="mt-8">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Recently Tracked</h3>
//               <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {recentTracking.map(number => (
//                   <button
//                     key={number}
//                     onClick={() => handleRecentTrackingClick(number)}
//                     className="px-3 py-2 bg-gray-100 rounded text-gray-800 text-center hover:bg-gray-200 transition-colors"
//                   >
//                     {number}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div className="mt-8">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Your Bookings</h3>
//             <p className="text-gray-600">
//               <a href="#" className="text-blue-600 hover:underline">
//                 Log in to view your bookings and tracking numbers
//               </a>
//             </p>
//           </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

import React, { useState } from 'react';
import { findBookingByTrackingNumber } from '../utils/localStorage';

export default function TrackingComponent() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState(null);

  function handleTrack(e) {
    e.preventDefault();
    setError(null);
    
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }
    
    const booking = findBookingByTrackingNumber(trackingNumber.toUpperCase());
    
    if (booking) {
      setTrackingResult(booking);
    } else {
      setError('No parcel found with this tracking number');
      setTrackingResult(null);
    }
  }

  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function getStatusStepNumber(status) {
    const statusOrder = ['Pending', 'In Transit', 'Delivered'];
    return statusOrder.indexOf(status) + 1;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Track Your Parcel</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4">
          <form onSubmit={handleTrack} className="flex items-center">
            <input
              type="text"
              placeholder="Enter your tracking number"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Track
            </button>
          </form>
          {error && (
            <p className="mt-2 text-red-600 text-sm">{error}</p>
          )}
        </div>
      </div>
      
      {trackingResult && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Tracking Information</h3>
              <p className="text-gray-600 mt-1">Tracking Number: <span className="font-medium">{trackingResult.trackingNumber}</span></p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase">Sender</h4>
                <p className="mt-1 text-gray-900">{trackingResult.senderName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase">Recipient</h4>
                <p className="mt-1 text-gray-900">{trackingResult.recipientName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase">Created Date</h4>
                <p className="mt-1 text-gray-900">{formatDate(trackingResult.createdAt)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase">Last Updated</h4>
                <p className="mt-1 text-gray-900">{formatDate(trackingResult.updatedAt || trackingResult.createdAt)}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Current Status</h4>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${trackingResult.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    trackingResult.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                    trackingResult.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'}`}
                >
                  {trackingResult.status}
                </span>
              </div>
            </div>
            
            {/* Progress Steps */}
            {trackingResult.status !== 'Cancelled' && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Delivery Progress</h4>
                <div className="relative">
                  {/* Progress Bar */}
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      style={{ width: `${(getStatusStepNumber(trackingResult.status) / 3) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Steps */}
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                        getStatusStepNumber(trackingResult.status) >= 1 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200'
                      }`}>
                        1
                      </div>
                      <div className="text-xs mt-1">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                        getStatusStepNumber(trackingResult.status) >= 2 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200'
                      }`}>
                        2
                      </div>
                      <div className="text-xs mt-1">In Transit</div>
                    </div>
                    <div className="text-center">
                      <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                        getStatusStepNumber(trackingResult.status) >= 3 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200'
                      }`}>
                        3
                      </div>
                      <div className="text-xs mt-1">Delivered</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}