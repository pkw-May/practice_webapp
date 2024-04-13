import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export type PostType = 'listItem' | 'viewItem';

export interface PostInfo {
  type: PostType;
  id?: number;
  userId?: number;
  title: string;
  content: string;
  name?: string | any;
  date?: string;
}

const PostBox: React.FC<PostInfo> = ({
  type,
  id,
  name,
  title,
  content,
  date,
}) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    if (type === 'listItem') {
      navigate(`/post/${id}`);
    }
  };

  return (
    <Wrapper $type={type} onClick={clickHandler}>
      <TopArea>
        <Header $type={type}>{title}</Header>
        {name && <User $type={type}>{name}</User>}
        <Content $type={type}>{content}</Content>
      </TopArea>
      {date && <Date>{date}</Date>}
    </Wrapper>
  );
};

export default PostBox;

const Wrapper = styled.article<{ $type: PostType }>`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  align-items: left;
  flex-direction: column;

  padding: 16px 20px;
  margin-bottom: 3px;

  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.radius.basic};

  cursor: default;

  ${({ $type }) =>
    $type === 'listItem' &&
    css`
      height: 128px;
      border-color: ${({ theme }) => theme.colors.lightGray};
      cursor: pointer;
      &:hover {
        border: none;
        outline: 2px solid ${({ theme }) => theme.colors.skyblue};
      }
    `}
`;

const TopArea = styled.div`
  height: 90%;
  display: flex;
  align-items: left;
  flex-direction: column;
`;

const Header = styled.h5<{ $type: PostType }>`
  text-align: left;
  ${({ theme }) => theme.fonts.title}
  font-size: 18px;

  ${({ $type }) =>
    $type === 'listItem' &&
    css`
      font-size: 16px;
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
  height: 100%;
  padding: 0px 0 20px 0;

  ${({ theme }) => theme.fonts.content}
  text-align: left;
  font-size: 16px;
  overflow: scroll;

  ${({ $type }) =>
    $type === 'listItem' &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0;
      height: auto;
    `}
`;

const Date = styled.p`
  align-self: flex-start;

  margin: 15px 0;

  text-align: left;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray};
`;
