import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckEmail } from '../../hooks/useCheckEmail';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useCreateUser, DataForUserCreation } from '../../hooks/useCreateUser';
import { Icon, Title, InputLine, Button, WarningLine } from '../../components';
import {
  CHECK_BTN_CONFIG,
  INPUT_CONFIGS,
  PAGE_CONFIGS,
  SIGNUP_BTN_CONFIG,
} from './DATA';
import styled from 'styled-components';

type InputKey = 'username' | 'email' | 'password' | 'checkPassword';
type InputData = Record<
  InputKey,
  {
    checked?: boolean;
    value: string;
    valid: boolean;
    error: string;
  }
>;

const Signup = () => {
  const navigate = useNavigate();
  const { checkExist } = useCheckEmail();
  const { validateEmail, validatePassword } = useFormValidation();
  const { callCognitoSignUp } = useCreateUser();

  const [inputData, setInputData] = useState<InputData>({
    username: { value: '', valid: false, error: '' },
    email: { value: '', valid: false, checked: false, error: '' },
    password: { value: '', valid: false, error: '' },
    checkPassword: { value: '', valid: false, error: '' },
  });

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as InputKey;
    const value = e.target.value;

    setInputData(prev => ({
      ...prev,
      [key]: { ...prev[key], value: value },
    }));
  };

  const goBack = () => {
    navigate('/signin');
  };

  const afterCallSignUp = (
    result: boolean,
    dataForUserCreation?: DataForUserCreation,
  ) => {
    if (result) {
      navigate('/signup/confirm', {
        state: { dataForUserCreation },
      });
    } else {
      alert('회원가입에 실패했습니다.');
    }
  };

  const checkId = async () => {
    if (!inputData.email.valid) {
      const { valid, error } = validateEmail(inputData.email.value);
      setInputData(prev => ({
        ...prev,
        email: {
          ...prev.email,
          valid: valid,
          error: error,
        },
      }));
      if (valid) {
        const { valid, message } = await checkExist(inputData.email.value);
        setInputData(prev => ({
          ...prev,
          email: {
            ...prev.email,
            checked: valid,
            valid: valid,
            error: message,
          },
        }));
      }
    } else {
      const { valid, message } = await checkExist(inputData.email.value);
      setInputData(prev => ({
        ...prev,
        email: {
          ...prev.email,
          checked: valid,
          valid: valid,
          error: message,
        },
      }));
    }
  };

  const submitData = async (e: React.MouseEvent<HTMLButtonElement> | any) => {
    e.preventDefault();
    if (inputData.email.valid && !inputData.email.checked) {
      setInputData(prev => ({
        ...prev,
        email: {
          ...prev.email,
          valid: false,
          error: '아이디 중복을 확인해 주세요.',
        },
      }));
    }

    if (!inputData.email.valid) {
      const { valid, error } = validateEmail(inputData.email.value);
      setInputData(prev => ({
        ...prev,
        email: {
          ...prev.email,
          valid: valid,
          error: error,
        },
      }));
      if (!inputData.email.checked) {
        checkId();
      }
    }

    if (!inputData.password.valid) {
      const { valid, error } = validatePassword(inputData.password.value);
      setInputData(prev => ({
        ...prev,
        password: {
          ...prev.password,
          valid: valid,
          error: error,
        },
      }));
    }

    if (inputData.password.value !== inputData.checkPassword.value) {
      setInputData(prev => ({
        ...prev,
        checkPassword: {
          ...prev.checkPassword,
          valid: false,
          error: '비밀번호가 일치하지 않습니다.',
        },
      }));
    } else {
      setInputData(prev => ({
        ...prev,
        checkPassword: {
          ...prev.checkPassword,
          valid: true,
          error: '',
        },
      }));
    }

    if (
      inputData.email.valid &&
      inputData.email.value &&
      inputData.password.valid &&
      inputData.password.value &&
      inputData.checkPassword.valid &&
      inputData.checkPassword.value
    ) {
      const { email, password } = inputData;
      callCognitoSignUp(email.value, password.value, afterCallSignUp);
    }
  };

  useEffect(() => {
    setInputData(prev => ({
      ...prev,
      email: {
        ...prev.email,
        checked: false,
        valid: false,
        error: '',
      },
    }));
  }, [inputData.email.value]);

  useEffect(() => {
    setInputData(prev => ({
      ...prev,
      password: {
        ...prev.password,
        valid: false,
        error: '',
      },
    }));
  }, [inputData.password.value]);

  useEffect(() => {
    setInputData(prev => ({
      ...prev,
      checkPassword: {
        ...prev.checkPassword,
        valid: false,
        error: '',
      },
    }));
  }, [inputData.checkPassword.value]);

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          iconStyle={{ size: '20', color: 'gray' }}
          icon="back"
          onClickHandler={goBack}
        />
      </TopBtnWrapper>
      <Title {...PAGE_CONFIGS} />

      <CheckWrapper>
        <InputLine
          key={INPUT_CONFIGS[0].name}
          {...INPUT_CONFIGS[0]}
          onChangeHandler={updateInput}
        />
        <Button {...CHECK_BTN_CONFIG} onClickHandler={checkId} />
        {inputData[INPUT_CONFIGS[0].name as InputKey].error && (
          <WarningLine
            isInfo={inputData[INPUT_CONFIGS[0].name as InputKey].valid}
            warning={inputData[INPUT_CONFIGS[0].name as InputKey].error}
          />
        )}
      </CheckWrapper>

      {INPUT_CONFIGS.slice(1).map(({ type, title, name }) => {
        return (
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
        );
      })}

      <Button {...SIGNUP_BTN_CONFIG} onClickHandler={submitData} />
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  width: 300px;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;
  margin: auto;

  gap: 20px;
`;

const TopBtnWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.left}
  margin-top: 20px;
  margin-bottom: -20px;
`;

const InputWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;
`;

const CheckWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 6px;
  align-items: end;
`;
