import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCreateUser } from '../../hooks/useCreateUser';
import { InputLine, Button, Title } from '../../components';
import styled from 'styled-components';

const ConfirmPage: React.FC = () => {
  const { callCognitoVerify } = useCreateUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState('');

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(event.target.value);
  };

  const afterVerification = (result: boolean) => {
    if (result) {
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } else {
      alert('회원가입에 실패했습니다.');
    }
  };

  const callCodeVerification = async () => {
    const dataForUserCreation = location.state.dataForUserCreation;
    callCognitoVerify(dataForUserCreation, verificationCode, afterVerification);
  };

  return (
    <Wrapper>
      <Title title="이메일의 인증번호를 입력해주세요." />
      <InputLine type="text" name="code" onChangeHandler={updateInput} />
      <Button
        btnName="인증하기"
        btnStyle={{ bgColor: 'skyblue', fontColor: 'white' }}
        onClickHandler={callCodeVerification}
      />
    </Wrapper>
  );
};

export default ConfirmPage;

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.center};
  flex-direction: column;
  width: 300px;
  margin: auto;
  padding-top: 40px;
  gap: 20px;
`;
