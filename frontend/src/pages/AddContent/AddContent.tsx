import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Title, Button, InputBox } from '../../components';
import { PAGE_CONFIGS, BUTTON_CONFIGS } from './DATA';
import styled from 'styled-components';

const AddContent: React.FC = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState('');

  const updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setInputData(value);
  };

  const goToList = () => {
    navigate('/main');
  };

  const submitContent = () => {
    console.log('Content Submitted');
  };

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          icon="back"
          iconStyle={{ color: 'gray', size: '20' }}
          onClickHandler={goToList}
        />
      </TopBtnWrapper>

      <Title title={PAGE_CONFIGS.title} />
      <InputBox onChangeHandler={updateInput} type="content" />
      <Button
        btnName={BUTTON_CONFIGS.btnName}
        btnStyle={BUTTON_CONFIGS.btnStyle}
        onClickHandler={submitContent}
      />
    </Wrapper>
  );
};

export default AddContent;

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
  margin-bottom: -30px;
`;
