import React, { useState } from 'react';
import Icon from '../../components/Icon';
import Title from '../../components/Title';
import styled from 'styled-components';
import {
  CHECK_BTN_CONFIG,
  INPUT_CONFIGS,
  PAGE_CONFIGS,
  SIGNUP_BTN_CONFIG,
  WARNINGS,
} from './DATA';
import InputLine from '../../components/InputLine';
import Button from '../../components/Button';
import WarningLine from '../../components/WarningLine';
import { useNavigate } from 'react-router-dom';

type InputKey = 'userId' | 'password' | 'checkPassword';
type InputData = Record<
  InputKey,
  {
    value: string;
    valid: boolean;
    error: string;
  }
>;

const Signup = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    userId: { value: '', valid: false, error: 'check' },
    password: { value: '', valid: false, error: 'length' },
    checkPassword: { value: '', valid: false, error: 'c' },
  });
  const { title } = PAGE_CONFIGS;

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as InputKey;
    const value = e.target.value;

    setInputData((prev: InputData) => ({
      ...prev,
      [key]: { ...prev[key], value: value },
    }));
  };

  const goBack = () => {
    navigate('/login');
  };

  const checkId = () => {
    console.log('check id!');
  };

  const submitData = (e: React.MouseEvent<HTMLButtonElement> | any) => {
    console.log(e);
    console.log('submit clicked!');
  };

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          iconStyle={{ size: '20', color: 'gray' }}
          icon="back"
          onClickHandler={goBack}
        />
      </TopBtnWrapper>
      <Title title={title} />

      <CheckWrapper>
        <InputLine
          key={INPUT_CONFIGS[0].name}
          type={INPUT_CONFIGS[0].type}
          title={INPUT_CONFIGS[0].title}
          name={INPUT_CONFIGS[0].name}
          onChangeHandler={updateInput}
        />
        <Button
          btnName={CHECK_BTN_CONFIG.btnName}
          btnStyle={CHECK_BTN_CONFIG.btnStyle}
          onClickHandler={checkId}
        />
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
                warning={
                  WARNINGS[
                    inputData[name as InputKey].error as keyof typeof WARNINGS
                  ]
                }
              />
            )}
          </InputWrapper>
        );
      })}

      <Button
        btnName={SIGNUP_BTN_CONFIG.btnName}
        btnStyle={SIGNUP_BTN_CONFIG.btnStyle}
        onClickHandler={submitData}
      />
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
