import { API_BASE } from './utils';
import { getAuthToken } from '@/utils/cookies';


//get all events

export const getAllEvents = async () => {
    try {
        const response = await fetch(`${API_BASE}/api/events`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        if (response.ok) {
            return response.json();
        }
        else {
            const contentType = response.headers.get('content-type');
            const errorMessage = contentType === 'application/json'
                ? (await response.json()).error || 'Unknown error'
                : 'Unknown error';
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error;
    }
};


//get all events user is registred to
export const getUserRegistredEvents = async (userId) => {
    try {
        const response = await fetch(`${API_BASE}/api/users/${userId}/registrations`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        if (response.ok) {
            return response.json();
        }
        else {
            const contentType = response.headers.get('content-type');
            const errorMessage = contentType === 'application/json'
                ? (await response.json()).error || 'Unknown error'
                : 'Unknown error';
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to fetch user registred events:', error);
        throw error;
    }
};


//get events user attended
export const getUserAttendedEvents = async (userId) => {
    try {
        const response = await fetch(`${API_BASE}/api/users/${userId}/attendance`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        if (response.ok) {
            return response.json();
        } else {
            const contentType = response.headers.get('content-type');
            const errorMessage = contentType === 'application/json'
                ? (await response.json()).error || 'Unknown error'
                : 'Unknown error';
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to fetch user attended events:', error);
        throw error;
    }
};


//register user to event
export const registerForEvent = async (eventId, userId) => {
    try {
        const response = await fetch(`${API_BASE}/api/events/${eventId}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ userId })
        });
        if (response.ok) {
            return response.json();
        } else {
            const contentType = response.headers.get('content-type');
            const errorMessage = contentType === 'application/json'
                ? (await response.json()).error || 'Unknown error'
                : 'Unknown error';
            throw new Error(errorMessage);
        }   
    } catch (error) {
        console.error('Failed to register user to event:', error);
        throw error;
    }
};

//unregister user from event
export const unregisterFromEvent = async (eventId, userId) => {
    try {
        const response = await fetch(`${API_BASE}/api/events/${eventId}/unregister`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ userId })
        });
        if (response.ok) {
            return response.json();
        } else {
            const contentType = response.headers.get('content-type');
            const errorMessage = contentType === 'application/json'
                ? (await response.json()).error || 'Unknown error'
                : 'Unknown error';
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to unregister user from event:', error);
        throw error;
    }
};



//get qr code

export const getQrCode = async (userId) => {
    try {
        const response = await fetch(`${API_BASE}/api/users/${userId}/qr`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        if (response.ok) {
            return response.json();
        } else {
            const contentType = response.headers.get('content-type');
            const errorMessage = contentType === 'application/json'
                ? (await response.json()).error || 'Unknown error'
                : 'Unknown error';
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to fetch QR code:', error);
        throw error;
    }
};



//get docs of an event
export const getEventDocs = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE}/api/events/${eventId}/docs`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        if (response.ok) {
            return response.json();
        } else {
            const contentType = response.headers.get('content-type');
            const errorMessage = contentType === 'application/json'
                ? (await response.json()).error || 'Unknown error'
                : 'Unknown error';
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to fetch event documents:', error);
        throw error;
    }
};
