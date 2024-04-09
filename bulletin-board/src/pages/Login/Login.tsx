import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import Title from '../../components/Title';
import Button from '../../components/Button';
import InputLine from '../../components/InputLine';
import WarningLine from '../../components/WarningLine';
import { PAGE_CONFIGS, BUTTON_CONFIGS, INPUT_CONFIGS, WARNINGS } from './DATA';
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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<InputData>({
    userId: { value: '', valid: false, error: '' },
    password: { value: '', valid: false, error: '' },
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

  const onClickHandlers = {
    login: () => {
      // POST 통신 로직 집어넣기
      console.log('login');
      console.log(
        'ID: ',
        inputData.userId.value,
        'PW: ',
        inputData.password.value,
      );
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
            <WarningLine
              warning={
                WARNINGS[
                  inputData[name as InputKey].error as keyof typeof WARNINGS
                ]
              }
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
              onClickHandlers[type as keyof typeof onClickHandlers]
            }
          />
        ))}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Login;

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
