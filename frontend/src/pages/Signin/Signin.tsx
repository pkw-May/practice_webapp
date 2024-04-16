import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../ContextAPI/AccountContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { Icon, Title, Button, InputLine, WarningLine } from '../../components';
import { PAGE_CONFIGS, BUTTON_CONFIGS, INPUT_CONFIGS } from './DATA';
import styled from 'styled-components';

type InputKey = 'email' | 'password';

type InputData = Record<
  InputKey,
  {
    value: string;
    valid: boolean;
    error: string;
  }
>;

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const { authenticate } = useContext(AccountContext);
  const { validateEmail, validatePassword } = useFormValidation();
  const [inputData, setInputData] = useState<InputData>({
    email: { value: '', valid: false, error: '' },
    password: { value: '', valid: false, error: '' },
  });

  const goHome = (): void => {
    navigate('/main');
  };

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key: InputKey = e.target.name as InputKey;
    const value: string = e.target.value;

    setInputData((prev: InputData) => ({
      ...prev,
      [key]: { ...prev[key], value: value },
    }));
  };

  const submitUserInfo = async () => {
    try {
      const result = await authenticate(
        inputData.email.value,
        inputData.password.value,
      );

      if (result) {
        navigate('/main');
      } else {
        console.error(result);
        window.alert('로그인 과정에서 에러가 발생했습니다.');
      }
    } catch (err) {
      console.error(err);
      window.alert('확인되지 않는 사용자 입니다.');
    }
  };

  const clickSignin = async () => {
    if (
      inputData.email.value &&
      inputData.email.valid &&
      inputData.password.value &&
      inputData.password.valid
    ) {
      await submitUserInfo();
    } else {
      const idValidation = validateEmail(inputData.email.value);
      setInputData(prev => ({
        ...prev,
        email: {
          ...prev.email,
          valid: idValidation.valid,
          error: idValidation.error,
        },
      }));

      const pwValidation = validatePassword(inputData.password.value);
      setInputData(prev => ({
        ...prev,
        password: {
          ...prev.password,
          valid: pwValidation.valid,
          error: pwValidation.error,
        },
      }));

      if (idValidation.valid && pwValidation.valid) {
        submitUserInfo();
      }
    }
  };

  const ON_CLICK_HANDLERS = {
    signin: () => {
      clickSignin();
    },
    signup: () => {
      navigate('/signup');
    },
  };

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon iconStyle={{ size: '20' }} icon="home" onClickHandler={goHome} />
      </TopBtnWrapper>
      <Title {...PAGE_CONFIGS} />
      {INPUT_CONFIGS.map(({ type, title, name }) => (
        <InputWrapper key={name}>
          <InputLine
            type={type}
            title={title}
            name={name}
            onChangeHandler={updateInput}
          />
          {inputData[name as InputKey].error && (
            <WarningLine
              isInfo={inputData[name as InputKey].valid}
              warning={inputData[name as InputKey].error}
            />
          )}
        </InputWrapper>
      ))}
      <ButtonWrapper>
        {BUTTON_CONFIGS.map(({ type, btnName, btnStyle }) => (
          <Button
            key={btnName}
            btnName={btnName}
            btnStyle={btnStyle}
            onClickHandler={
              ON_CLICK_HANDLERS[type as keyof typeof ON_CLICK_HANDLERS]
            }
          />
        ))}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Signin;

const Wrapper = styled.div`
  width: 95vw;

  ${({ theme }) => theme.flex.center}
  flex-direction: column;
  margin: auto;
  gap: 20px;
`;

const TopBtnWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.right}

  margin-top: 20px;
  margin-bottom: -20px;
`;

const InputWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;
  gap: 10px;
`;
