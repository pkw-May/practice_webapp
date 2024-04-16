import { AxiosResponse } from 'axios';

export interface CallResponse {
  isLoading: boolean;
  data: any;
  error: any;
}

const useCallHandler = () => {
  const fetchData = async (callback: () => Promise<AxiosResponse>) => {
    const callResponse: CallResponse = {
      isLoading: true,
      data: null,
      error: null,
    };

    try {
      const response = await callback();

      callResponse.data = response.data;
      callResponse.error = null;
    } catch (error) {
      const message = error.response?.data?.message || error.message;

      callResponse.data = null;
      callResponse.error = message;
    } finally {
      callResponse.isLoading = false;
      return callResponse;
    }
  };

  return { fetchData };
};

export default useCallHandler;
