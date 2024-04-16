import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AccountContext } from '../../ContextAPI/AccountContext';
import { PostsContext, PostInfo } from '../../ContextAPI/PostsContext';
import useCallHandler from '../../hooks/useCallHandler';

import { Icon, Title, Button, PostBox } from '../../components';
import { PAGE_CONFIGS, BUTTON_CONFIGS } from './DATA';
import styled from 'styled-components';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const { fetchData } = useCallHandler();
  const { userStatus, logout, getSession } = useContext(AccountContext);
  const { getPosts, posts } = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(true);

  const clickProfile = () => {
    if (userStatus.userSignedIn) {
      if (window.confirm('로그아웃 하시겠습니까?')) {
        logout();
        navigate('/signin');
      }
    } else {
      navigate('/signin');
    }
  };

  const addPost = () => {
    if (userStatus.userTokenCorrect) {
      navigate('/addPost');
    } else {
      window.alert('로그인이 필요한 기능입니다.');
      navigate('/signin');
    }
  };

  const getPostList = async () => {
    try {
      const response = await fetchData(() => getPosts());
      const {
        isLoading: postIsLoading,
        data: postResult,
        error: postError,
      } = response;
      if (!postIsLoading && postResult) {
        setIsLoading(false);
      } else if (postError) {
        alert(postError);
      }
    } catch (e) {
      console.error(e);
      alert(e);
    }
  };

  useEffect(() => {
    getSession();
    getPostList();
  }, []);

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          icon={userStatus.userSignedIn ? 'signin' : 'signout'}
          iconStyle={{ size: '20' }}
          onClickHandler={clickProfile}
        />
      </TopBtnWrapper>
      <Title title={PAGE_CONFIGS.title} />
      <Button
        btnName={BUTTON_CONFIGS.btnName}
        btnStyle={BUTTON_CONFIGS.btnStyle}
        onClickHandler={addPost}
      />
      <PostWrapper>
        {posts.length > 0 &&
          posts.map(({ id, title, content }: PostInfo) => (
            <PostBox
              type="listItem"
              key={id}
              id={id}
              title={title}
              content={content}
            />
          ))}
        <EmptyArea>
          {isLoading && (
            <Icon
              icon="loading"
              iconStyle={{ size: '25', color: 'white', disable: true }}
            />
          )}
          {!isLoading && posts.length === 0 && (
            <>
              <Icon
                icon="sadFace"
                iconStyle={{ size: '25', color: 'white', disable: true }}
              />
              게시글이 없습니다...ㅠㅠ
            </>
          )}
        </EmptyArea>
      </PostWrapper>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  width: 95vw;
  ${({ theme }) => theme.flex.center};
  flex-direction: column;
  margin: auto;
  padding-bottom: 100px;
  gap: 20px;
`;

const TopBtnWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.right}

  margin-top: 20px;
  margin-bottom: -30px;
`;

const PostWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.center};
  flex-direction: column;
  gap: 2px;
  margin-top: 30px;
`;

const EmptyArea = styled.div`
  ${({ theme }) => theme.flex.center};
  flex-direction: column;

  gap: 5px;

  ${({ theme }) => theme.fonts.content};
`;
