import React, { useState, useEffect, useContext } from 'react';
import { AccountContext } from '../ContextAPI/AccountContext';

const CHECK_ID_MSG = {
  EXIST: '이미 존재하는 아이디입니다.',
  NEW: '사용할 수 있는 아이디입니다.',
  ERROR: '아이디 중복 확인에 실패했습니다.',
};

interface UserInfoResponse {
  id: number;
  name: string;
  email: string;
  deleted: boolean;
}

interface CheckEmailResponse {
  valid: boolean;
  message: string;
}

export const useCheckEmail = () => {
  const { checkEmail } = useContext(AccountContext);

  const checkExist = async (userEmail: string): Promise<CheckEmailResponse> => {
    let valid = false;
    let message = '';

    const result = await checkEmail(userEmail);

    if (result.success) {
      valid = result.isExist ? false : true;
      message = CHECK_ID_MSG[result.isExist ? 'EXIST' : 'NEW'];
    } else {
      valid = false;
      message = CHECK_ID_MSG.ERROR;
    }

    return { valid, message };
  };

  return { checkExist };
};
