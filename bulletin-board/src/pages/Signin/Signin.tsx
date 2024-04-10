import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../ContextAPI/AccountContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import Icon from '../../components/Icon';
import Title from '../../components/Title';
import Button from '../../components/Button';
import InputLine from '../../components/InputLine';
import WarningLine from '../../components/WarningLine';
import { PAGE_CONFIGS, BUTTON_CONFIGS, INPUT_CONFIGS } from './DATA';
import styled from 'styled-components';

type InputKey = 'userId' | 'password';

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
  const { validateUserId, validatePassword } = useFormValidation();
  const [inputData, setInputData] = useState<InputData>({
    userId: { value: '', valid: true, error: '' },
    password: { value: '', valid: true, error: '' },
  });

  const { title } = PAGE_CONFIGS;

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

  const clickSignin = async () => {
    if (
      inputData.userId.value &&
      inputData.userId.valid &&
      inputData.password.value &&
      inputData.password.valid
    ) {
      // =======================
      // REDUX!!!!!
      // =======================
      const result = await authenticate(
        inputData.userId.value,
        inputData.password.value,
      );

      if (result) {
        navigate('/main');
      } else {
        window.alert('확인되지 않는 사용자입니다.');
      }
    } else {
      const idValidation = validateUserId(inputData.userId.value);
      setInputData(prev => ({
        ...prev,
        userId: {
          ...prev.userId,
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
    }
  };

  const ON_CLICK_HANDLERS = {
    signin: () => {
      clickSignin();
    },
    signup: () => {
      console.log('signup!');
      navigate('/signup');
    },
  };

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          iconStyle={{ size: '20', color: 'gray' }}
          icon="home"
          onClickHandler={goHome}
        />
      </TopBtnWrapper>
      <Title title={title} />
      {INPUT_CONFIGS.map(({ type, title, name }) => (
        <InputWrapper key={name}>
          <InputLine
            type={type}
            title={title}
            name={name}
            onChangeHandler={updateInput}
          />
          {inputData[name as InputKey].error && (
            <WarningLine warning={inputData[name as InputKey].error} />
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
  width: 300px;

  ${({ theme }) => theme.flex.center}
  flex-direction: column;
  margin: auto;
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
