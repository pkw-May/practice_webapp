import { authService } from '../apis/authService';

const CHECK_ID_MSG = {
  EXIST: '이미 존재하는 아이디입니다.',
  NEW: '사용할 수 있는 아이디입니다.',
  ERROR: '아이디 중복 확인에 실패했습니다.',
};

interface CheckEmailResponse {
  valid: boolean;
  message: string;
}

export const useCheckEmail = () => {
  const checkExist = async (email: string): Promise<CheckEmailResponse> => {
    let valid = false;
    let message = '';

    try {
      const response = await authService.checkEmail(email);

      const { status, data } = response;

      if (status === 200) {
        valid = data.isExist ? false : true;
        message = CHECK_ID_MSG[data.isExist ? 'EXIST' : 'NEW'];
      }
    } catch (err) {
      valid = false;
      message = CHECK_ID_MSG.ERROR;
    } finally {
      return { valid, message };
    }
  };

  return { checkExist };
};
