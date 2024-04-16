import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AccountContext } from '../ContextAPI/AccountContext';
import { BASE_URL } from '../config';

export interface CallOptions {
  url: string;
  method?: string;
  body?: any;
  headers?: any;
}

export interface AxiosResponse {
  isLoading: boolean;
  data: any;
  error: any;
}

const useAxios = () => {
  const { sessionJWT, getSession } = useContext(AccountContext);
  const [response, setResponse] = useState<AxiosResponse>({
    isLoading: true,
    data: null,
    error: null,
  });

  const fetchData = async (callOptions: CallOptions) => {
    setResponse(prev => ({ ...prev, isLoading: true }));

    if (
      (callOptions.method === 'POST' || callOptions.method === 'DELETE') &&
      !sessionJWT
    ) {
      setResponse({
        isLoading: false,
        data: null,
        error: '로그인이 필요합니다',
      });

      return;
    }

    try {
      const { data } = await axios({
        url: `${BASE_URL}${callOptions.url}`,
        method: callOptions.method || 'GET',
        data: callOptions.body,
        headers: {
          ...callOptions.headers,
          Authorization: `Bearer ${sessionJWT}`,
        },
      });
      setResponse(prev => ({ ...prev, data, error: null }));
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setResponse(prev => ({ ...prev, data: null, error: message }));
    } finally {
      setResponse(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return { fetchData, response };
};

export default useAxios;
