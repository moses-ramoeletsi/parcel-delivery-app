import React, { useState } from 'react'

const dummyBookings = [
  {
    id: 1,
    senderName: 'Alice',
    recipientName: 'Bob',
    status: 'Pending',
  },
  {
    id: 2,
    senderName: 'John',
    recipientName: 'Doe',
    status: 'In Transit',
  },
]

const dummyInquiries = [
  {
    id: 1,
    name: 'Jane',
    email: 'jane@example.com',
    message: 'What are your delivery hours?',
  },
]

export default function AdminPanel() {
    const [bookings, setBookings] = useState([
      {
        id: 1,
        senderName: 'Alice',
        recipientName: 'Bob',
        status: 'Pending',
      },
      {
        id: 2,
        senderName: 'John',
        recipientName: 'Doe',
        status: 'In Transit',
      },
    ]);
  
    const [inquiries] = useState([
      {
        id: 1,
        name: 'Jane',
        email: 'jane@example.com',
        message: 'What are your delivery hours?',
      },
    ]);
  
    function updateStatus(id, newStatus) {
      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
      );
    }
  
    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h2>
        
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Manage Bookings</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              New Booking
            </button>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sender
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Update Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map(({ id, senderName, recipientName, status }) => (
                    <tr key={id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {senderName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {recipientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                            status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          value={status}
                          onChange={e => updateStatus(id, e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option>Pending</option>
                          <option>In Transit</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Inquiries</h3>
          
          {inquiries.length === 0 ? (
            <p className="text-gray-500 italic">No inquiries at the moment.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map(({ id, name, email, message }) => (
                <div key={id} className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{name}</h4>
                      <p className="text-sm text-gray-600">{email}</p>
                    </div>
                    <div>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">New</span>
                    </div>
                  </div>
                  <div className="mt-4 text-gray-700 bg-gray-50 p-3 rounded-md">
                    {message}
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Reply
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                      Mark as Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  