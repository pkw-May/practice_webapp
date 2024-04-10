const userIdErrorMSG = {
  EMPTY: '아이디를 작성해 주세요',
  FORMAT: '이메일 형식을 지켜주세요',
  CHECK: '아이디 중복을 확인해 주세요',
};

const passwordErrorMSG = {
  EMPTY: '비밀번호를 작성해 주세요',
  LENGTH: '4자 이상 작성해주세요',
  ADD_NUM: '숫자를 하나 이상 포함시켜 주세요',
  ADD_SYM: '특수문자를 하나 이상 포함시켜 주세요',
};

export const useFormValidation = () => {
  const validateUserId = (userId: string) => {
    let valid = false;
    let error = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userId) {
      error = userIdErrorMSG.EMPTY;
    } else if (!emailRegex.test(userId)) {
      error = userIdErrorMSG.FORMAT;
    } else {
      valid = true;
    }

    return { valid, error };
  };

  const validatePassword = (password: string) => {
    let valid = false;
    let error = '';
    const minCharRegex = /.{4,}/;
    const containsNumberRegex = /\d/;
    const containsSpecialCharRegex = /[!@#$%^&*]/;

    if (!password) {
      error = passwordErrorMSG.EMPTY;
    } else if (!minCharRegex.test(password)) {
      error = passwordErrorMSG.LENGTH;
    } else if (!containsNumberRegex.test(password)) {
      error = passwordErrorMSG.ADD_NUM;
    } else if (!containsSpecialCharRegex.test(password)) {
      error = passwordErrorMSG.ADD_SYM;
    } else {
      valid = true;
    }

    return { valid, error };
  };

  return {
    validateUserId,
    validatePassword,
  };
};
