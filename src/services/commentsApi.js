import API from './api'; 


export const createComment = async (commentData) => {
    try {
        const response = await API.post('/comments/create', commentData); 
        return response.data; 
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const getCommentById = async (commentId) => {
    try {
        const response = await API.get(`/comments/${commentId}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching comment by ID:', error);
        throw error;
    }
};

export const getCommentsByPostId = async (postId) => {
     try {
         const response = await API.get(`/comments/post/${postId}`); 
         return response.data;
     } catch (error) {
         console.error(`Error fetching comments for post ${postId}:`, error);
         throw error;
     }
};

export const updateCommentById = async (commentId, updateData) => {
    try {
        const response = await API.put(`/comments/update/${commentId}`, updateData); 
        return response.data; 
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
};

export const deleteCommentById = async (commentId) => {
    try {
        const response = await API.delete(`/comments/delete/${commentId}`); 
        return response.data; 
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};