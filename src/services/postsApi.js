import API from './api';

export const getPosts = async () => {
  try {
    const response = await API.get('/posts/'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await API.post('/posts/create', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export const updatePost = async (postId, updateData) => {
  try {
    const response = await API.put(`/posts/update/${postId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export const deletePost = async (postId) => {
  try {
    const response = await API.delete(`/posts/delete/${postId}`); 
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export const getPostsByCourse = async (courseIdentifier) => {
  try {
    const response = await API.get(`/posts/course/${courseIdentifier}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts by course:', error);
    throw error;
  }
}

export const getPostsById = async (postId) => {
  try {
    const response = await API.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
}