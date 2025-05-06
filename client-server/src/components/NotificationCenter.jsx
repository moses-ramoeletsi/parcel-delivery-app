import React, { useState, useEffect } from 'react';
import { getUserNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../utils/localStorage';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications on component mount
  useEffect(() => {
    loadNotifications();
    // Set up polling to check for new notifications
    const interval = setInterval(loadNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  function loadNotifications() {
    const userNotifications = getUserNotifications();
    setNotifications(userNotifications);
    setUnreadCount(userNotifications.filter(n => !n.read).length);
  }

  function handleReadNotification(id) {
    markNotificationAsRead(id);
    loadNotifications();
  }

  function handleReadAll() {
    markAllNotificationsAsRead();
    loadNotifications();
  }

  function formatTimeDifference(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="py-2 px-3 bg-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
            {notifications.length > 0 && (
              <button 
                onClick={handleReadAll}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-4 px-3 text-sm text-gray-500 text-center">
                No notifications
              </div>
            ) : (
              <div>
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimeDifference(notification.createdAt)}</p>
                      </div>
                      {!notification.read && (
                        <button 
                          onClick={() => handleReadNotification(notification.id)}
                          className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}