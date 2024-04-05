import React, { useState } from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';
import InputLine from '../../components/InputLine';
import WarningLine from '../../components/WarningLine';
import { PAGE_CONFIGS, BUTTON_CONFIGS, INPUT_CONFIGS } from './DATA';
import styled from 'styled-components';

interface InputData {
  [key: string]: {
    value: string;
    valid: boolean;
  };
}

const Login = () => {
  const [inputData, setInputData] = useState<InputData>({
    userId: { value: '', valid: false },
    password: { value: '', valid: false },
  });

  const { title } = PAGE_CONFIGS;
  const { btnName, btnStyle } = BUTTON_CONFIGS;

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key: string = e.target.name;
    const value: string = e.target.value;

    setInputData((prev: InputData) => ({
      ...prev,
      [key]: { ...prev[key], value: value },
    }));
  };

  const submitInfo = () => {
    console.log(inputData);
    console.log('Login Clicked!!');
  };

  return (
    <Wrapper>
      <Title title={title} />
      {INPUT_CONFIGS.map(({ type, name }) => (
        <React.Fragment key={name}>
          <InputLine type={type} name={name} onChangeHandler={updateInput} />
          {inputData[name].valid || <WarningLine />}
        </React.Fragment>
      ))}
      <Button
        btnName={btnName}
        btnStyle={btnStyle}
        onClickHandler={submitInfo}
      />
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 300px;

  ${({ theme }) => theme.flex.center}
  flex-direction: column;
  gap: 20px;
  margin: auto;
  padding: 20px;
`;
