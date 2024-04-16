import axios from 'axios';
import { BASE_URL } from '../config';
import { DataForUserCreation } from '../hooks/useCreateUser';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const checkEmail = async (email: string) => {
  return API.get(`/auth/checkEmail?email=${email}`);
};

const insertNewUser = async (userData: DataForUserCreation) => {
  return API.post('/auth/signup', userData);
};

export const authService = {
  checkEmail,
  insertNewUser,
};
