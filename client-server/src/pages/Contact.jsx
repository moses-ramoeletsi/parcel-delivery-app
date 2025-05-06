import React, { useState, useEffect } from 'react';
import { getUserInquiries, saveInquiry, replyToInquiry } from '../utils/localStorage';

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  // Inquiries section state
  const [inquiries, setInquiries] = useState([]);
  const [showInquiries, setShowInquiries] = useState(false);
  const [replyToId, setReplyToId] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  // New inquiry form visibility
  const [showNewInquiryForm, setShowNewInquiryForm] = useState(false);

  // Load user inquiries on component mount
  useEffect(() => {
    loadInquiries();
  }, []);

  function loadInquiries() {
    const userInquiries = getUserInquiries();
    setInquiries(userInquiries);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Save the inquiry
    saveInquiry(formData);
    // Show success message
    setSubmitted(true);
    // Reset form
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
      // If this was from the new inquiry form, hide it
      if (showNewInquiryForm) {
        setShowNewInquiryForm(false);
      }
    }, 5000);
    // Refresh inquiries list
    loadInquiries();
    // Show inquiries section after submission
    setShowInquiries(true);
  }

  function handleNewInquiryClick() {
    setShowNewInquiryForm(true);
    // Reset form data in case there was previous input
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
  }

  function handleReplyChange(e) {
    setReplyText(e.target.value);
  }

  function handleReplySubmit(inquiryId) {
    replyToInquiry(inquiryId, {
      isAdmin: false,
      message: replyText
    });
    setReplyText('');
    setReplyToId(null);
    loadInquiries();
  }

  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Contact Info Section */}
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
        
        {/* Contact Form Section */}
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
      
      {/* My Inquiries Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900">My Inquiries</h3>
          <div className="flex gap-2">
            {/* New Add Inquiry Button */}
            <button
              onClick={handleNewInquiryClick}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Inquiry
            </button>
            
            <button
              onClick={() => setShowInquiries(!showInquiries)}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              {showInquiries ? 'Hide Inquiries' : 'View Inquiries'}
              <svg
                className={`ml-2 h-5 w-5 transform ${showInquiries ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* New Inquiry Form (shows when "New Inquiry" button is clicked) */}
        {showNewInquiryForm && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-900">Create New Inquiry</h4>
                <button 
                  onClick={() => setShowNewInquiryForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
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
                    <label htmlFor="new-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="new-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="new-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="new-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="new-message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="new-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowNewInquiryForm(false)}
                      className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        
        {showInquiries && (
          inquiries.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 text-center text-gray-500">
              You haven't submitted any inquiries yet.
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {inquiries.map(inquiry => (
                <div key={inquiry.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{inquiry.name}</h4>
                        <p className="text-sm text-gray-500">{formatDate(inquiry.createdAt)}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full 
                        ${inquiry.status === 'New' ? 'bg-yellow-100 text-yellow-800' : 
                          inquiry.status === 'Replied' ? 'bg-blue-100 text-blue-800' : 
                          inquiry.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'}`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="mt-4 bg-gray-50 p-3 rounded-md">
                      <p className="text-gray-700">{inquiry.message}</p>
                    </div>

                    {/* Chat/Reply Section */}
                    {inquiry.replies && inquiry.replies.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Conversation</h5>
                        <div className="space-y-3">
                          {inquiry.replies.map(reply => (
                            <div 
                              key={reply.id}
                              className={`flex ${reply.isAdmin ? 'justify-start' : 'justify-end'}`}
                            >
                              <div 
                                className={`max-w-xs rounded-lg px-4 py-2 ${
                                  reply.isAdmin ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'
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
                    {replyToId === inquiry.id ? (
                      <div className="mt-4 border-t pt-4">
                        <div className="flex">
                          <input
                            type="text"
                            value={replyText}
                            onChange={handleReplyChange}
                            placeholder="Type your reply..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={() => handleReplySubmit(inquiry.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => setReplyToId(inquiry.id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}