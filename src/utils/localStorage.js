// src/utils/localStorage.js

// Local Storage Keys
export const STORAGE_KEYS = {
    BOOKINGS: 'parcel_delivery_bookings',
    INQUIRIES: 'parcel_delivery_inquiries',
    USER_BOOKINGS: 'parcel_delivery_user_bookings',
    NOTIFICATIONS: 'parcel_delivery_notifications',
    USER_ID: 'parcel_delivery_user_id',
    ADMIN_LOGIN: 'parcel_delivery_admin_login'
  };
  
  // Generate unique IDs for items
  export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
  
  // Generate a unique user ID if not already created
  export function getUserId() {
    let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
    if (!userId) {
      userId = generateId();
      localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    }
    return userId;
  }
  
  // Initialize local storage with default data if empty
  export function initializeLocalStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.USER_BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.USER_BOOKINGS, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));
    }
    
    // Set default admin credentials
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_LOGIN)) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_LOGIN, JSON.stringify({
        username: 'admin',
        password: 'admin123'
      }));
    }
  }
  
  // BOOKING FUNCTIONS
  export function saveBooking(bookingData) {
    const userId = getUserId();
    const bookings = getBookings();
    const newBooking = {
      id: generateId(),
      userId,
      ...bookingData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      trackingNumber: generateTrackingNumber()
    };
    
    // Save to all bookings
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    
    // Save to user bookings
    const userBookings = getUserBookings();
    userBookings.push(newBooking);
    localStorage.setItem(STORAGE_KEYS.USER_BOOKINGS, JSON.stringify(userBookings));
    
    // Create initial notification
    addNotification({
      userId,
      bookingId: newBooking.id,
      message: `Your booking has been confirmed. Tracking number: ${newBooking.trackingNumber}`,
      read: false,
      createdAt: new Date().toISOString()
    });
    
    return newBooking;
  }
  
  export function getBookings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
  }
  
  export function getUserBookings() {
    const userId = getUserId();
    const allBookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_BOOKINGS) || '[]');
    return allBookings.filter(booking => booking.userId === userId);
  }
  
  export function updateBookingStatus(bookingId, newStatus) {
    // Update in all bookings
    const bookings = getBookings();
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        const updatedBooking = { ...booking, status: newStatus, updatedAt: new Date().toISOString() };
        
        // Add notification for status change
        addNotification({
          userId: booking.userId,
          bookingId: booking.id,
          message: `Your parcel status has been updated to: ${newStatus}`,
          read: false,
          createdAt: new Date().toISOString()
        });
        
        return updatedBooking;
      }
      return booking;
    });
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));
    
    // Update in user bookings
    const userBookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_BOOKINGS) || '[]');
    const updatedUserBookings = userBookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return booking;
    });
    localStorage.setItem(STORAGE_KEYS.USER_BOOKINGS, JSON.stringify(updatedUserBookings));
  }
  
  // Generate a random tracking number
  export function generateTrackingNumber() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // Find booking by tracking number
  export function findBookingByTrackingNumber(trackingNumber) {
    const bookings = getBookings();
    return bookings.find(booking => booking.trackingNumber === trackingNumber);
  }
  
  // INQUIRY FUNCTIONS
  export function saveInquiry(inquiryData) {
    const userId = getUserId();
    const inquiries = getInquiries();
    const newInquiry = {
      id: generateId(),
      userId,
      ...inquiryData,
      status: 'New',
      replies: [],
      createdAt: new Date().toISOString()
    };
    
    inquiries.push(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    return newInquiry;
  }
  
  export function getInquiries() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
  }
  
  export function getUserInquiries() {
    const userId = getUserId();
    const allInquiries = getInquiries();
    return allInquiries.filter(inquiry => inquiry.userId === userId);
  }
  
  export function replyToInquiry(inquiryId, replyData) {
    const inquiries = getInquiries();
    const updatedInquiries = inquiries.map(inquiry => {
      if (inquiry.id === inquiryId) {
        const newReply = {
          id: generateId(),
          ...replyData,
          createdAt: new Date().toISOString()
        };
        
        const updatedInquiry = {
          ...inquiry,
          replies: [...inquiry.replies, newReply],
          status: replyData.isAdmin ? 'Replied' : 'Updated',
          updatedAt: new Date().toISOString()
        };
        
        // Add notification for reply
        if (replyData.isAdmin) {
          addNotification({
            userId: inquiry.userId,
            inquiryId: inquiry.id,
            message: `You have received a reply to your inquiry: "${inquiry.message.substring(0, 30)}..."`,
            read: false,
            createdAt: new Date().toISOString()
          });
        }
        
        return updatedInquiry;
      }
      return inquiry;
    });
    
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updatedInquiries));
  }
  
  export function markInquiryAsResolved(inquiryId) {
    const inquiries = getInquiries();
    const updatedInquiries = inquiries.map(inquiry => {
      if (inquiry.id === inquiryId) {
        return {
          ...inquiry,
          status: 'Resolved',
          updatedAt: new Date().toISOString()
        };
      }
      return inquiry;
    });
    
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updatedInquiries));
  }
  
  // NOTIFICATION FUNCTIONS
  export function addNotification(notificationData) {
    const notifications = getNotifications();
    const newNotification = {
      id: generateId(),
      ...notificationData,
      createdAt: new Date().toISOString()
    };
    
    notifications.push(newNotification);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    return newNotification;
  }
  
  export function getNotifications() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  }
  
  export function getUserNotifications() {
    const userId = getUserId();
    const allNotifications = getNotifications();
    return allNotifications
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  export function markNotificationAsRead(notificationId) {
    const notifications = getNotifications();
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updatedNotifications));
  }
  
  export function markAllNotificationsAsRead() {
    const userId = getUserId();
    const notifications = getNotifications();
    const updatedNotifications = notifications.map(notification => {
      if (notification.userId === userId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updatedNotifications));
  }
  
  // ADMIN FUNCTIONS
  export function isAdminLoggedIn() {
    return sessionStorage.getItem('admin_logged_in') === 'true';
  }
  
  export function loginAdmin(username, password) {
    const adminData = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_LOGIN));
    if (adminData.username === username && adminData.password === password) {
      sessionStorage.setItem('admin_logged_in', 'true');
      return true;
    }
    return false;
  }
  
  export function logoutAdmin() {
    sessionStorage.removeItem('admin_logged_in');
  }