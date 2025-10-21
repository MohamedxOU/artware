import { API_BASE } from './utils';
import { getAuthToken } from '@/utils/cookies';


//get user details by ID
export const getUserById = async (userId) => {
    try {
        const response = await fetch(`${API_BASE}/api/users/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};


//update user details
export const updateUserById = async (userId, userData) => {
    try { 
        // Check if userData is FormData
        const isFormData = userData instanceof FormData;
        
        const headers = {
            "Authorization": `Bearer ${getAuthToken()}`
        };
        
        // Only add Content-Type for JSON data
        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }
        
        const response = await fetch(`${API_BASE}/api/users/${userId}`, {
            method: "PATCH",
            headers: headers,
            body: isFormData ? userData : JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Failed to update user data');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }   
};




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
