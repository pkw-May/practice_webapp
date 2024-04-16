import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsContext } from '../ContextAPI/PostsContext';
import useCallHandler from '../hooks/useCallHandler';
import Icon from './Icon';
import styled, { css } from 'styled-components';
import AvatarIcon from './AvatarIcon';

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
  const { deletePost: deletePostApi } = useContext(PostsContext);
  const { fetchData } = useCallHandler();
  const navigate = useNavigate();
  const clickHandler = () => {
    if (type === 'listItem') {
      navigate(`/post/${id}`);
    }
  };

  const deletePost = async () => {
    if (type === 'viewItem') {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        const response = await fetchData(() => deletePostApi(id));
        const {
          isLoading: deleteIsLoading,
          data: deleteResult,
          error: deleteError,
        } = response;

        if (!deleteIsLoading && deleteResult) {
          window.alert('게시글이 삭제되었습니다.');
          navigate('/main');
        } else if (deleteError) {
          window.alert(deleteError);
        }
      }
    }
  };

  return (
    <Wrapper $type={type} onClick={clickHandler}>
      <TopArea>
        {name && (
          <UserArea $type={type}>
            <AvatarIcon name={name} size="18px" />
            {name}
          </UserArea>
        )}
        <Header $type={type}>{title}</Header>
        <Content $type={type}>{content}</Content>
      </TopArea>
      <BottomArea>
        {date && <Date>{date}</Date>}
        {type === 'viewItem' && (
          <Icon
            icon="trash"
            iconStyle={{ color: 'red', size: '16', disable: false }}
            onClickHandler={deletePost}
          />
        )}
      </BottomArea>
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

  background-color: ${({ theme }) => theme.colors.bgBlack};
  border-radius: ${({ theme }) => theme.radius.basic};

  cursor: default;

  ${({ $type }) =>
    $type === 'listItem' &&
    css`
      height: 128px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};

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
  margin-bottom: 20px;

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

const UserArea = styled.p<{ $type: PostType }>`
  ${({ theme }) => theme.flex.center}
  align-self: flex-start;

  gap: 7px;

  margin-bottom: 25px;

  text-align: right;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};

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

      &:hover {
        box-shadow: none;
      }
    `}
`;

const BottomArea = styled.div`
  height: 10%;
  ${({ theme }) => theme.flex.between}
  padding: 15px 0 10px 0;
`;

const Date = styled.p`
  text-align: left;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray};
`;
