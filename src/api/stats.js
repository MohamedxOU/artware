import { API_BASE } from './utils';
import { getAuthToken } from '@/utils/cookies';

export const getEventsAttended = async (user_id) => {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE}/api/statistics/eventAttended/${user_id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch events attended');
  }

  return response.json();
};


export const getCellsJoined = async (user_id) => {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE}/api/statistics/cellsJoined/${user_id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch cells joined');
  }

  return response.json();
};


export const getEventsRegistered = async (user_id) => {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE}/api/statistics/eventRegistered/${user_id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch events registered');
  }

  return response.json();
};


export const getUpcomingEvents = async () => {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE}/api/statistics/upComingEvents`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch upcoming events');
  }

  return response.json();
};

