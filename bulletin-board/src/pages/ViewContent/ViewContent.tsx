import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon, Title, ContentBox, Button, InputBox } from '../../components';
import { ContentInfo } from '../../components/ContentBox';
import { CommentInfo } from './CommentBox';
import CommentBox from './CommentBox';
import { PAGE_CONFIGS, COMMENT_BTN_CONFIG } from './DATA';
import styled from 'styled-components';

const AddContent: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const type = 'viewItem';
  const [content, setContent] = useState<ContentInfo>({
    type: type,
    title: '',
    body: '',
  });
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [inputData, setInputData] = useState('');

  const updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setInputData(value);
  };

  const goToList = () => {
    navigate('/main');
  };

  const submitComment = () => {
    // inputData 보내기
    console.log('Comment Submitted');
  };

  const getContent = (id: string) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(res => {
        setContent(res);
        getUserName(res.userId);
      });
  };

  const getUserName = (userId: string) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(res => {
        setContent(prev => ({
          ...prev,
          type: type,
          userName: res.username,
        }));
      });
  };

  const getComments = (id: string) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then(res => res.json())
      .then(res => setComments(res));
  };

  useEffect(() => {
    if (!params.id) {
      return;
    }
    getContent(params.id);
    getComments(params.id);
  }, []);

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

      <ContentWrapper>
        {content && (
          <ContentBox
            type={type}
            title={content.title}
            userName={content.userName}
            body={content.body}
          />
        )}
      </ContentWrapper>

      <CommentInputWrapper>
        <InputBox onChangeHandler={updateInput} type="comment" />
        <Button
          btnName={COMMENT_BTN_CONFIG.btnName}
          btnStyle={COMMENT_BTN_CONFIG.btnStyle}
          onClickHandler={submitComment}
        />
      </CommentInputWrapper>
      <CommentList>
        {comments.length > 0 &&
          comments.map(({ id, name, body }) => (
            <CommentBox key={id} name={name} body={body} />
          ))}
      </CommentList>
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

const ContentWrapper = styled.div`
  width: 100%;
`;

const CommentInputWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 6px;
  align-items: end;
`;

const CommentList = styled.ul`
  width: 100%;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;
  gap: 3px;
`;
