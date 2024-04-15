import React from 'react';
import { Icon } from '../../components';
import styled from 'styled-components';

export interface CommentInfo {
  postId?: number;
  id?: number;
  name: string;
  content: string;
}

const CommentBox: React.FC<CommentInfo> = ({ name, content }) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <Icon
          icon="user"
          iconStyle={{ size: '16', color: 'darkGray', disable: true }}
        />
        <Header>{name}</Header>
      </HeaderWrapper>
      <Comment>{content}</Comment>
    </Wrapper>
  );
};

export default CommentBox;

const Wrapper = styled.article`
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;

  padding: 16px 20px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const HeaderWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.left}
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

const Header = styled.h5`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.darkGray};
  text-align: left;
`;

const Comment = styled.div`
  ${({ theme }) => theme.fonts.comment}
  text-align: left;

  overflow: scroll;
`;
