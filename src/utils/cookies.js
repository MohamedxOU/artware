/**
 * Cookie utility functions for managing authentication tokens
 */

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiration in days (default: 7)
 */
export function setCookie(name, value, days = 7) {
  if (typeof window === 'undefined') return;
  
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  
  // Set cookie with secure flags
  const secure = process.env.NODE_ENV === 'production' ? '; secure' : '';
  document.cookie = `${name}=${value || ''}${expires}; path=/${secure}; samesite=strict`;
}

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export function getCookie(name) {
  if (typeof window === 'undefined') return null;
  
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  
  return null;
}

/**
 * Delete a cookie by name
 * @param {string} name - Cookie name
 */
export function deleteCookie(name) {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=strict`;
}

/**
 * Get auth token from cookie
 * @returns {string|null} Auth token or null
 */
export function getAuthToken() {
  return getCookie('auth_token');
}

/**
 * Set auth token in cookie
 * @param {string} token - Auth token
 */
export function setAuthToken(token) {
  setCookie('auth_token', token, 7); // 7 days expiration
}

/**
 * Remove auth token from cookie
 */
export function removeAuthToken() {
  deleteCookie('auth_token');
}
