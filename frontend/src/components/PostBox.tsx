import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export type PostType = 'listItem' | 'viewItem';

export interface PostInfo {
  type: PostType;
  id?: number;
  userId?: number;
  name?: string | any;
  title: string;
  content: string;
}

const PostBox: React.FC<PostInfo> = ({ type, id, name, title, content }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    if (type === 'listItem') {
      navigate(`/post/${id}`);
    }
  };

  return (
    <Wrapper $type={type} onClick={clickHandler}>
      <Header $type={type}>{title}</Header>
      {name && <User $type={type}>{name}</User>}
      <Content $type={type}>{content}</Content>
    </Wrapper>
  );
};

export default PostBox;

const Wrapper = styled.article<{ $type: PostType }>`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: left;
  flex-direction: column;

  padding: 16px 20px;
  margin-bottom: 10px;

  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.radius.basic};

  cursor: default;

  ${({ $type }) =>
    $type === 'listItem' &&
    css`
      height: 110px;
      border-color: ${({ theme }) => theme.colors.lightGray};
      cursor: pointer;
      &:hover {
        margin-top: -2px;
        border: 2px solid ${({ theme }) => theme.colors.skyblue};
      }
    `}
`;

const Header = styled.h5<{ $type: PostType }>`
  text-align: left;
  font: 14px;
  font-weight: 600;

  ${({ $type }) =>
    $type === 'listItem' &&
    css`
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 10px;
    `}
`;

const User = styled.p<{ $type: PostType }>`
  align-self: flex-end;
  margin: 15px 0px 25px 0px;

  text-align: right;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};

  ${({ $type }) =>
    $type === 'listItem' &&
    css`
      margin-bottom: 10px;
    `}
`;

const Content = styled.div<{ $type: PostType }>`
  text-align: left;
  font-size: 16px;

  ${({ $type }) =>
    $type === 'listItem' &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    `}
`;
