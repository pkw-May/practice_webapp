import React, { useState, useEffect } from 'react';
import ContentBox, { ContentInfo } from '../../components/ContentBox';
import { Icon, Title, Button } from '../../components';
import { PAGE_CONFIGS, BUTTON_CONFIGS } from './DATA';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [contentList, setContentList] = useState<ContentInfo[]>([]);
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => {
        setContentList(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const clickProfile = () => {
    console.log('profile clicked!');
    navigate('/login');
  };

  const addContent = () => {
    // check login 상태 & authentication
    console.log('addContent!!');
    navigate('/addContent');
  };

  return (
    <Wrapper>
      <TopBtnWrapper>
        <Icon
          icon="profile"
          iconStyle={{ color: 'gray', size: '20' }}
          onClickHandler={clickProfile}
        />
      </TopBtnWrapper>
      <Title title={PAGE_CONFIGS.title} />
      <Button
        btnName={BUTTON_CONFIGS.btnName}
        btnStyle={BUTTON_CONFIGS.btnStyle}
        onClickHandler={addContent}
      />
      <ContentWrapper>
        {contentList.length > 0 &&
          contentList.map(({ id, userId, title, body }: ContentInfo) => (
            <ContentBox
              type="listItem"
              key={id}
              id={id}
              userId={userId}
              title={title}
              body={body}
            />
          ))}
      </ContentWrapper>
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
  ${({ theme }) => theme.flex.left}

  margin-top: 20px;
  margin-bottom: -30px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.center};
  flex-direction: column;
  gap: 4px;
  margin-top: 30px;
`;
