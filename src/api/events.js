const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500';


//get all events

export const getAllEvents = async () => {
    try {
        const response = await fetch(`${API_BASE}/api/events`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
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
        const response = await fetch(`${API_BASE}/api/events/${userId}/registrations`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
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
        const response = await fetch(`${API_BASE}/api/events/${userId}/attendance`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
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
export const registerUserToEvent = async (userId, eventId) => {
    try {
        const response = await fetch(`${API_BASE}/api/events/${eventId}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
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
export const unregisterUserFromEvent = async (userId, eventId) => {
    try {
        const response = await fetch(`${API_BASE}/api/events/${eventId}/register`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
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
