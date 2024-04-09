import React from 'react';
import styled from 'styled-components';

export interface CommentInfo {
  postId?: number;
  id?: number;
  name: string;
  email?: string;
  body: string;
}

const CommentBox: React.FC<CommentInfo> = ({ name, body }) => {
  return (
    <Wrapper>
      <Header>{name}</Header>
      <Comment>{body}</Comment>
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
  margin-bottom: 10px;

  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.radius.basic};
`;

const Header = styled.h5`
  margin-bottom: 10px;

  text-align: left;
  font: 14px;
  font-weight: 600;
`;

const Comment = styled.div`
  overflow: scroll;

  text-align: left;
  font-size: 16px;
`;
