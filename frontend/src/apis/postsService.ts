import axios from 'axios';
import { BASE_URL } from '../config';
import { PostInfo } from '../ContextAPI/PostsContext';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getPosts = async (id = '') => {
  return API.get(`/posts?id=${id}`);
};

const createPost = async (post: PostInfo, token: string) => {
  return API.post('/posts', post, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deletePost = async (id: number, token: string) => {
  return API.delete(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const postService = {
  getPosts,
  createPost,
  deletePost,
};
