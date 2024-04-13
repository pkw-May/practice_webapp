import React, { useState, useContext } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { AccountContext } from '../../ContextAPI/AccountContext';
import UserPool from '../../UserPool';
import { InputLine, Button, Title } from '../../components';
import { DataForUserCreation } from '../../ContextAPI/AccountContext';
import styled from 'styled-components';

const ConfirmPage: React.FC = () => {
  const { createUser } = useContext(AccountContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVerificationCode(event.target.value);
  };

  const callCreateUser = async (userData: DataForUserCreation) => {
    try {
      const result = await createUser(userData);
      if (result) {
        window.alert('회원가입이 완료되었습니다.');
        navigate('/signin');
      } else {
        console.log(result);
      }
    } catch (err) {
      console.error(err);
      window.alert('회원가입에 실패했습니다.');
    }
  };

  const handleConfirm = async () => {
    const dataForUserCreation = location.state.dataForUserCreation;

    const userData = {
      Username: dataForUserCreation.email,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(
      verificationCode,
      true,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        } else if (result === 'SUCCESS') {
          callCreateUser(dataForUserCreation);
        }
      },
    );
  };

  return (
    <Wrapper>
      <Title title="이메일의 인증번호를 입력해주세요." />
      <InputLine
        type="text"
        name="code"
        onChangeHandler={handleVerificationCodeChange}
      />
      <Button
        btnName="인증하기"
        btnStyle={{ bgColor: 'skyblue', fontColor: 'white' }}
        onClickHandler={handleConfirm}
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
  gap: 20px;
`;
