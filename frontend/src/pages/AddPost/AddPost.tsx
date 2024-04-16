import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsContext } from '../../ContextAPI/PostsContext';
import useCallHandler from '../../hooks/useCallHandler';
import { Icon, Title, Button, InputBox, InputLine } from '../../components';
import { PAGE_CONFIGS, BUTTON_CONFIGS } from './DATA';
import styled from 'styled-components';

const AddPost: React.FC = () => {
  const { createPost } = useContext(PostsContext);
  const { fetchData } = useCallHandler();

  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    title: '',
    content: '',
  });

  const updateInput = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const key = e.target.name;
    const value = e.target.value;
    setInputData(prev => ({ ...prev, [key]: value }));
  };

  const goToList = () => {
    navigate('/main');
  };

  const submitPost = async () => {
    const submitData = {
      title: inputData.title,
      content: inputData.content,
    };

    const response = await fetchData(() => createPost(submitData));
    const {
      isLoading: postIsLoading,
      data: postResult,
      error: postError,
    } = response;

    if (!postIsLoading && postResult) {
      window.alert('게시글이 작성되었습니다.');
      goToList();
    } else if (postError) {
      window.alert(postError);
      goToList();
    }
  };

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          icon="back"
          iconStyle={{ size: '20' }}
          onClickHandler={goToList}
        />
      </TopBtnWrapper>

      <Title title={PAGE_CONFIGS.title} />
      <InputLine
        type={PAGE_CONFIGS.inputTitle.type}
        title={PAGE_CONFIGS.inputTitle.title}
        name={PAGE_CONFIGS.inputTitle.name}
        onChangeHandler={updateInput}
      />
      <InputBox
        type="post"
        onChangeHandler={updateInput}
        name={PAGE_CONFIGS.inputContent.name}
        title={PAGE_CONFIGS.inputContent.title}
      />
      <Button {...BUTTON_CONFIGS} onClickHandler={submitPost} />
    </Wrapper>
  );
};

export default AddPost;

const Wrapper = styled.div`
  width: 95vw;
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
