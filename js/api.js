/**
 * SMART DIGITAL WINGS - API CLIENT & STORAGE ENGINE
 * Unified REST client connecting to live backend endpoints with offline buffering.
 */

const API_BASE_URL = 'https://lemonchiffon-lobster-756028.hostingersite.com/api/api';

/**
 * Toast Notification System
 */
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'error' : ''}`;
  
  const iconSvg = type === 'error' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Confetti Celebration Trigger
 */
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#EAD186', '#FFF3CC', '#FFFFFF']
    });
  }
}

/**
 * Save lead locally as offline buffer & for Admin CRM
 */
function bufferLeadLocally(leadData) {
  try {
    const existing = JSON.parse(localStorage.getItem('sdw_local_leads') || '[]');
    existing.unshift({
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      ...leadData,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    });
    localStorage.setItem('sdw_local_leads', JSON.stringify(existing));
  } catch (e) {
    console.warn('Local storage write error:', e);
  }
}

/**
 * Submit Instant Proposal Request (Hero Section)
 */
async function submitProposalEnquiry(data) {
  bufferLeadLocally({
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    type: 'Instant Proposal Enquiry',
    note: `Budget: ${data.budget}`
  });

  try {
    const response = await fetch(`${API_BASE_URL}/proposal-enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Submission failed');
    }
    return { success: true, data: result };
  } catch (err) {
    console.warn('API sync notice (buffered locally):', err.message);
    return { success: true, buffered: true };
  }
}

/**
 * Submit Full Consultation Strategy Booking Modal
 */
async function submitConsultationBooking(data) {
  bufferLeadLocally({
    name: data.full_name,
    email: data.email,
    phone: `${data.country_code} ${data.phone}`,
    service: Array.isArray(data.services) ? data.services.join(', ') : data.services,
    type: 'Strategy Call Booking',
    note: `Budget: ${data.budget} | Date: ${data.booking_date} at ${data.booking_time} | Company: ${data.company || 'N/A'}`
  });

  try {
    const response = await fetch(`${API_BASE_URL}/consultation-bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Booking submission failed');
    }
    return { success: true, data: result };
  } catch (err) {
    console.warn('API sync notice (buffered locally):', err.message);
    return { success: true, buffered: true };
  }
}

/**
 * Submit Contact Page Enquiry
 */
async function submitContactEnquiry(data) {
  bufferLeadLocally({
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    type: 'Contact Page Enquiry',
    note: `Website: ${data.website || 'N/A'} | Message: ${data.message}`
  });

  try {
    const response = await fetch(`${API_BASE_URL}/contact-enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Contact enquiry failed');
    }
    return { success: true, data: result };
  } catch (err) {
    console.warn('API sync notice (buffered locally):', err.message);
    return { success: true, buffered: true };
  }
}
