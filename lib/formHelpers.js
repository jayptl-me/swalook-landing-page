/**
 * Shared form validation helpers for Swalook landing pages.
 * Uses native React state — no external form library needed.
 */

export function validateField(field, value) {
  const trimmed = (value || '').trim();

  switch (field) {
    case 'name':
    case 'fullName':
    case 'businessName':
    case 'salonName': {
      if (!trimmed) return `${field === 'salonName' ? 'Salon/Business' : 'This'} name is required`;
      if (trimmed.length < 2) return 'Must be at least 2 characters';
      return '';
    }

    case 'email': {
      if (!trimmed) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email';
      return '';
    }

    case 'phone':
    case 'mobile': {
      if (!trimmed) return 'Phone number is required';
      // Accept +91-prefixed, spaces, dashes; Indian mobile: 10 digits starting with 6-9
      const cleaned = trimmed.replace(/[\s\-+()]/g, '');
      if (/^(91)?[6-9]\d{9}$/.test(cleaned) || /^[6-9]\d{9}$/.test(cleaned)) return '';
      if (!/^\d+$/.test(cleaned)) return 'Invalid phone number format';
      return 'Please enter a valid 10-digit mobile number';
    }

    case 'message': {
      if (trimmed && trimmed.length > 2000) return 'Message is too long (max 2000 chars)';
      return '';
    }

    default:
      return '';
  }
}

export function validateForm(fields, data) {
  const errors = {};
  let isValid = true;

  for (const field of fields) {
    const error = validateField(field, data[field]);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  }

  return { errors, isValid };
}

/**
 * Simulates an API call with a delay.
 * Replace with real fetch() once backend is available.
 * @returns {Promise<{success: boolean}>}
 */
export async function submitForm(endpoint, data) {
  // TODO: Replace with actual API endpoint once backend is available
  // const response = await fetch(endpoint, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error('Failed to submit form');
  // return response.json();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate for demo
      if (Math.random() > 0.9) {
        reject(new Error('Network error. Please try again.'));
      } else {
        resolve({ success: true });
      }
    }, 1500);
  });
}
