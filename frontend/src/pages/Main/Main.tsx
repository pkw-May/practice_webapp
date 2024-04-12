import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../ContextAPI/AccountContext';
import PostBox, { PostInfo } from '../../components/PostBox';
import { Icon, Title, Button } from '../../components';
import { PAGE_CONFIGS, BUTTON_CONFIGS } from './DATA';
import styled from 'styled-components';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const { userStatus, logout, getSession } = useContext(AccountContext);
  const [postList, setPostList] = useState<PostInfo[]>([]);

  const getData = () => {
    // ======================================//
    /** ✨✨✨--- REDUX & 에러 핸들링 ---✨✨✨ */
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => {
        setPostList(res);
      });
    /** ✨✨✨--- REDUX & 에러 핸들링 ---✨✨✨ */
    // ======================================//
  };

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

  useEffect(() => {
    getSession();
    getData();
  }, []);

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          icon={userStatus.userSignedIn ? 'signout' : 'signin'}
          iconStyle={{ color: 'gray', size: '20' }}
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
        {postList.length > 0 &&
          postList.map(({ id, userId, title, content }: PostInfo) => (
            <PostBox
              type="listItem"
              key={id}
              id={id}
              userId={userId}
              title={title}
              content={content}
            />
          ))}
      </PostWrapper>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  width: 300px;
  ${({ theme }) => theme.flex.center};
  flex-direction: column;
  margin: auto;
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
  gap: 4px;
  margin-top: 30px;
`;
