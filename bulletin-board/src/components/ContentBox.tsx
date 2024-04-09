import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export type ContentType = 'listItem' | 'viewItem';

export interface ContentInfo {
  type: ContentType;
  id?: number;
  userId?: number;
  userName?: string | any;
  title: string;
  body: string;
}

const ContentBox: React.FC<ContentInfo> = ({
  type,
  id,
  userName,
  title,
  body,
}) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    if (type === 'listItem') {
      navigate(`/content/${id}`);
    }
  };

  return (
    <Wrapper type={type} onClick={clickHandler}>
      <Header type={type}>{title}</Header>
      {userName && <User>{userName}</User>}
      <Content type={type}>{body}</Content>
    </Wrapper>
  );
};

export default ContentBox;

const Wrapper = styled.article<{ type: ContentType }>`
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;

  padding: 16px 20px;
  margin-bottom: 10px;

  border: 1px solid
    ${({ theme, type }) =>
      type === 'listItem' ? theme.colors.lightGray : theme.colors.darkGray};
  border-radius: ${({ theme }) => theme.radius.basic};

  cursor: ${({ type }) => (type === 'listItem' ? 'pointer' : 'default')};

  ${({ type }) =>
    type === 'listItem' &&
    css`
      &:hover {
        margin-top: -2px;
        border: 2px solid ${({ theme }) => theme.colors.skyblue};
      }
    `}
`;

const Header = styled.h5<{ type: ContentType }>`
  ${({ type }) =>
    type === 'listItem' &&
    css`
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 10px;
    `}

  text-align: left;
  font: 14px;
  font-weight: 600;
`;

const User = styled.p`
  align-self: flex-end;
  margin-bottom: 10px;

  text-align: right;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Content = styled.div<{ type: ContentType }>`
  ${({ type }) =>
    type === 'listItem' &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    `}

  text-align: left;
  font-size: 16px;
`;
