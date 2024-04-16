import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AccountContext,
  PostsContext,
  CommentsContext,
} from '../../ContextAPI';
import { Icon, Title, PostBox, Button, InputBox } from '../../components';
import CommentBox from './CommentBox';
import { PAGE_CONFIGS, COMMENT_BTN_CONFIG } from './DATA';
import styled from 'styled-components';

const ViewPost: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { userStatus, getSession } = useContext(AccountContext);
  const { posts, getPosts } = useContext(PostsContext);
  const { comments, getComments, createComment } = useContext(CommentsContext);
  const postBoxType = 'viewItem';

  const [inputData, setInputData] = useState('');

  const updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setInputData(value);
  };

  const goToList = () => {
    navigate('/main');
  };

  const submitComment = () => {
    if (userStatus.userTokenCorrect) {
      const submitData = {
        postId: params.id,
        content: inputData,
      };

      if (createComment(submitData)) {
        window.alert('댓글 등록 성공!');
      } else {
        window.alert('댓글 작성에 실패했습니다.');
      }
      window.location.reload();
    } else {
      window.alert('로그인이 필요한 기능입니다.');
      navigate('/signin');
    }
  };

  useEffect(() => {
    getSession();
    if (!params.id) {
      return;
    }
    getPosts(params.id);
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
        {posts.length > 0 && <PostBox type={postBoxType} {...posts[0]} />}
      </ContentWrapper>

      <CommentInputWrapper>
        <InputBox
          onChangeHandler={updateInput}
          type="comment"
          name={PAGE_CONFIGS.inputContent.name}
        />
        <Button {...COMMENT_BTN_CONFIG} onClickHandler={submitComment} />
      </CommentInputWrapper>
      <CommentList>
        {comments.length > 0 &&
          comments.map(({ id, name, content }) => (
            <CommentBox key={id} id={id} name={name} content={content} />
          ))}
      </CommentList>
    </Wrapper>
  );
};

export default ViewPost;

const Wrapper = styled.div`
  width: 300px;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;
  margin: auto;
  margin-bottom: 100px;
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

  margin-bottom: 10px;
`;

const CommentList = styled.ul`
  width: 100%;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;

  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.radius.basic};
`;
