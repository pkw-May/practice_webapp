import React, { useState, useEffect } from 'react';

const CHECK_ID_MSG = {
  EXIST: '이미 존재하는 아이디입니다.',
  NEW: '사용할 수 있는 아이디입니다.',
};

interface UserInfoResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}

export const useCheckId = () => {
  const [result, setResult] = useState<UserInfoResponse[]>([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => setResult(res));
  }, []);

  const checkExist = (userEmail: string) => {
    let valid = false;
    let message = '';

    if (result.length > 0) {
      if (result.find(item => item?.email === userEmail)) {
        message = CHECK_ID_MSG.EXIST;
      } else {
        valid = true;
        message = CHECK_ID_MSG.NEW;
      }
    }

    return { valid, message };
  };

  return { checkExist };
};
