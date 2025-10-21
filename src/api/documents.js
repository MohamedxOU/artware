import { API_BASE } from './utils';
import { getAuthToken } from '@/utils/cookies';


//get all documents

export const getAllDocuments = async () => {
    try {
        const response = await fetch(`${API_BASE}/api/documents`, {
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
        console.error('Failed to fetch documents:', error);
        throw error;
    }   
};


//get documents belonging to an event (eventId)

export const getDocumentsByEvent = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE}/api/events/${eventId}/docs`, {
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
        console.error('Failed to fetch documents by event:', error);
        throw error;
    }
};