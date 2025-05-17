import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/blog/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;