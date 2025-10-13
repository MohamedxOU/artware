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
