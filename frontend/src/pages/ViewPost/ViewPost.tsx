import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AccountContext,
  PostsContext,
  CommentsContext,
} from '../../ContextAPI';
import useCallHandler from '../../hooks/useCallHandler';
import { Icon, Title, PostBox, Button, InputBox } from '../../components';
import CommentBox from './CommentBox';
import { PAGE_CONFIGS, COMMENT_BTN_CONFIG } from './DATA';
import styled from 'styled-components';

const ViewPost: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { fetchData } = useCallHandler();
  const { getSession } = useContext(AccountContext);
  const { posts, getPosts } = useContext(PostsContext);
  const { comments, getComments, createComment } = useContext(CommentsContext);
  const postBoxType = 'viewItem';
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  const [inputData, setInputData] = useState('');

  const updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setInputData(value);
  };

  const goToList = () => {
    navigate('/main');
  };

  const submitComment = async () => {
    const submitData = {
      postId: params.id,
      content: inputData,
    };

    setIsCommentsLoading(true);
    const response = await fetchData(() => createComment(submitData));
    const {
      isLoading: isPostCommentLoading,
      data: postCommentResult,
      error: postCommentError,
    } = response;

    if (!isPostCommentLoading && postCommentResult) {
      window.alert('댓글 등록 성공!');
    } else if (postCommentError) {
      window.alert(postCommentError);
      if (postCommentError === '로그인이 필요한 기능입니다.') {
        navigate('/signin');
      }
    }
    window.location.reload();
    setIsCommentsLoading(false);
  };

  const callPostData = async id => {
    try {
      const response = await fetchData(() => getPosts(id));
      const {
        isLoading: postIsLoading,
        data: postResult,
        error: postError,
      } = response;
      if (!postIsLoading && postResult) {
        setIsPostLoading(false);
      } else if (postError) {
        alert(postError);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const callCommentList = async postId => {
    try {
      const response = await fetchData(() => getComments(postId));
      const {
        isLoading: commentIsLoading,
        data: commentResult,
        error: commentError,
      } = response;
      if (!commentIsLoading && commentResult) {
        setIsCommentsLoading(false);
      } else if (commentError) {
        alert(commentError);
      }
    } catch (e) {
      console.error(e);
      alert(e);
    }
  };

  useEffect(() => {
    getSession();
    if (!params.id) {
      return;
    }
    callPostData(params.id);
    callCommentList(params.id);
  }, []);

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

      <ContentWrapper>
        {isPostLoading && (
          <EmptyArea>
            <Icon icon="loading" iconStyle={{ size: '25' }} />
          </EmptyArea>
        )}
        {!isPostLoading && posts.length > 0 && (
          <PostBox type={postBoxType} {...posts[0]} />
        )}
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
        {isCommentsLoading && (
          <EmptyArea>
            <Icon icon="loading" iconStyle={{ size: '25' }} />
          </EmptyArea>
        )}
        {!isCommentsLoading &&
          comments.length > 0 &&
          comments.map(({ id, name, content }) => (
            <CommentBox key={id} id={id} name={name} content={content} />
          ))}
        {!isCommentsLoading && comments.length === 0 && (
          <EmptyArea>
            <Icon icon="sadFace" iconStyle={{ size: '25', color: 'white' }} />
            아직 댓글이 없습니다...ㅠㅠ
          </EmptyArea>
        )}
      </CommentList>
    </Wrapper>
  );
};

export default ViewPost;

const Wrapper = styled.div`
  width: 95vw;

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
`;

const CommentList = styled.ul`
  width: 100%;
  ${({ theme }) => theme.flex.center}
  flex-direction: column;

  border-radius: ${({ theme }) => theme.radius.basic};

  gap: 3px;
`;

const EmptyArea = styled.div`
  ${({ theme }) => theme.flex.center};
  flex-direction: column;

  gap: 5px;

  ${({ theme }) => theme.fonts.content};
`;
