const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500';


//get all cells (requires token)

export const getAllCells = async () => {
    try {
        const response = await fetch(`${API_BASE}/api/cellules`, {
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
                : 'Network error';
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to fetch cells:', error);
        throw error;
    }
};


//get cells that the user has joined (requires token and userId)

export const getUserCells = async (userId) => {
    try {
        const response = await fetch(`${API_BASE}/api/users/${userId}/cells`, {
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
                : 'Network error';
            throw new Error(errorMessage);
        }   
    } catch (error) {
        console.error('Failed to fetch user cells:', error);
        throw error;
    }
};




//join a cell (requires token and cellId)
export const joinCell = async (cellId) => {
    try {
        const response = await fetch(`${API_BASE}/api/cellules/${cellId}/users`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            return response.json();
        } else {
            const contentType = response.headers.get('content-type');
            const errorMessage = contentType === 'application/json'
                ? (await response.json()).error || 'Unknown error'
                : 'Network error';
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to join cell:', error);
        throw error;
    }
};

//quit cell (requires token and cellId)

export const quitCell = async (cellId) => {
    try {
        const response = await fetch(`${API_BASE}/api/cellules/${cellId}/users`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            return response.json();
        } else {
            const contentType = response.headers.get('content-type');
            const errorMessage = contentType === 'application/json'
                ? (await response.json()).error || 'Unknown error'
                : 'Network error';
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to quit cell:', error);
        throw error;
    }
};

