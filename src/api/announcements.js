import { API_BASE } from './utils';
import { getAuthToken } from '@/utils/cookies';


//get all announcements
export const getAllAnnouncements = async () => {
    try {
        const response = await fetch(`${API_BASE}/api/announcements`, {
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
        console.error('Failed to fetch announcements:', error);
        throw error;
    }
};
