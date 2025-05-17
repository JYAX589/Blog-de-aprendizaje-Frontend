import API from './api';

export const createComment = async (commentData) => {
    try {
        const response = await API.post('/create', commentData); 
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
}

export const getCommentsById = async (commentId) => {
    try {
        const response = await API.get(`/get/:id${commentId}`); 
        return response.data;
    } catch (error) {
        console.error('Error fetching comment by ID:', error);
        throw error;
    }
}

export const updateCommentsById = async (commentId, updateData) => {
    try {
        const response = await API.put(`/update/:id${commentId}`, updateData);
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}

export const deleteCommentsById = async (commentId) => {
    try {
        const response = await API.delete(`/delete/:id${commentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}