import React, { useState, useEffect } from 'react'
import { getBookings, getInquiries, updateBookingStatus, replyToInquiry, markInquiryAsResolved } from '../utils/localStorage';

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [replyData, setReplyData] = useState({
    inquiryId: null,
    message: ''
  });

  // Load data on component mount
  useEffect(() => {
    loadData();
    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  function loadData() {
    setBookings(getBookings());
    setInquiries(getInquiries());
  }

  function handleUpdateStatus(id, newStatus) {
    updateBookingStatus(id, newStatus);
    loadData();
  }

  function handleReplyChange(e) {
    setReplyData(prev => ({ ...prev, message: e.target.value }));
  }

  function handleReplySubmit(inquiryId) {
    if (replyData.message.trim()) {
      replyToInquiry(inquiryId, {
        isAdmin: true,
        message: replyData.message
      });
      setReplyData({ inquiryId: null, message: '' });
      loadData();
    }
  }

  function handleResolveInquiry(inquiryId) {
    markInquiryAsResolved(inquiryId);
    loadData();
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h2>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Bookings
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'inquiries'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Customer Inquiries
            {inquiries.filter(i => i.status === 'New' || i.status === 'Updated').length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-500 text-white">
                {inquiries.filter(i => i.status === 'New' || i.status === 'Updated').length}
              </span>
            )}
          </button>
        </nav>
      </div>
      
      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div>
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
                      Tracking #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sender
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
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
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No bookings available
                      </td>
                    </tr>
                  ) : (
                    bookings.map(({ id, senderName, recipientName, status, createdAt, trackingNumber }) => (
                      <tr key={id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {trackingNumber || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {senderName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {recipientName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {createdAt ? formatDate(createdAt) : 'N/A'}
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
                            onChange={e => handleUpdateStatus(id, e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option>Pending</option>
                            <option>In Transit</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Inquiries Tab */}
      {activeTab === 'inquiries' && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Inquiries</h3>
          
          {inquiries.length === 0 ? (
            <p className="text-gray-500 italic">No inquiries at the moment.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map(({ id, name, email, message, status, createdAt, replies = [] }) => (
                <div key={id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{name}</h4>
                        <p className="text-sm text-gray-600">{email}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(createdAt)}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full 
                          ${status === 'New' ? 'bg-yellow-100 text-yellow-800' : 
                            status === 'Updated' ? 'bg-red-100 text-red-800' :
                            status === 'Replied' ? 'bg-blue-100 text-blue-800' : 
                            'bg-green-100 text-green-800'}`}
                        >
                          {status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 text-gray-700 bg-gray-50 p-3 rounded-md">
                      {message}
                    </div>
                    
                    {/* Chat/Reply History */}
                    {replies && replies.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Conversation History</h5>
                        <div className="space-y-3">
                          {replies.map(reply => (
                            <div 
                              key={reply.id}
                              className={`flex ${reply.isAdmin ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-xs rounded-lg px-4 py-2 ${
                                  reply.isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                <p className="text-sm">{reply.message}</p>
                                <p className="text-xs opacity-75 mt-1">{formatDate(reply.createdAt)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Reply Form */}
                    {replyData.inquiryId === id ? (
                      <div className="mt-4 border-t pt-4">
                        <div className="flex">
                          <input
                            type="text"
                            value={replyData.message}
                            onChange={handleReplyChange}
                            placeholder="Type your reply..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={() => handleReplySubmit(id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 flex justify-end space-x-2">
                        <button 
                          onClick={() => setReplyData({ inquiryId: id, message: '' })}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Reply
                        </button>
                        {status !== 'Resolved' && (
                          <button 
                            onClick={() => handleResolveInquiry(id)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                          >
                            Mark as Resolved
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}