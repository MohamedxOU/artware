
const API_BASE = process.env.API_URL || 'http://localhost:3500';
//login api
export const login = async (email, password) => {
    return fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then(res => res.json()); }


//logout api
export const logout = async () => {
    return fetch(`${API_BASE}/logout`, {
      method: "POST",
      credentials: "include",
    }).then(res => res.json());
  }

//refresh token
export const refreshToken = async () => {
    return fetch(`${API_BASE}/refresh`, {
      method: "GET",
      credentials: "include",
    }).then(res => res.json());
}


//register api

export const register = async (formData) => {
    return fetch(`${API_BASE}/register`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  };



//reset password api
export const requestResetPassword = async (email) => {
    return fetch(`${API_BASE}/reset/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then(res => res.json());
  }

//confirm password reset api

export const confirmResetPassword = async (token, newPassword) => {
    return fetch(`${API_BASE}/reset/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    }).then(res => res.json());
  }
