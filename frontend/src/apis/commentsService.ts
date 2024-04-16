import axios from 'axios';
import { BASE_URL } from '../config';
import { CommentInfo } from '../ContextAPI/CommentsContext';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getComments = async (postId: string) => {
  return API.get(`/comments?postId=${postId}`);
};

const createComment = async (commentData: CommentInfo, token: string) => {
  return API.post('/comments', commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteComment = async (id: number, token: string) => {
  return API.delete(`/comments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const commentsService = {
  getComments,
  createComment,
  deleteComment,
};
