import React, { useContext } from 'react';
import { CommentsContext } from '../../ContextAPI/CommentsContext';
import useCallHandler from '../../hooks/useCallHandler';
import { Icon, AvatarIcon } from '../../components';
import styled from 'styled-components';

export interface CommentInfo {
  postId?: number;
  id?: number;
  colorCode?: string;
  name: string;
  content: string;
}

const CommentBox: React.FC<CommentInfo> = ({
  id,
  name,
  colorCode,
  content,
}) => {
  const { fetchData } = useCallHandler();
  const { deleteComment: deleteCommentApi } = useContext(CommentsContext);
  const deleteComment = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const response = await fetchData(() => deleteCommentApi(id));
      const { isLoading, data, error } = response;
      if (!isLoading && data) {
        window.alert('댓글이 삭제되었습니다.');
      } else if (error) {
        window.alert(error);
      }
    }
  };

  return (
    <Wrapper>
      <LeftArea>
        <AvatarIcon name={name} colorCode={colorCode} size="30px" />
      </LeftArea>
      <RightArea>
        <HeaderWrapper>
          <Header>{name}</Header>
          <Icon
            icon="trash"
            iconStyle={{ size: '14', color: 'red', disable: false }}
            onClickHandler={deleteComment}
          />
        </HeaderWrapper>
        <BodyWrapper>
          <Comment>{content}</Comment>
        </BodyWrapper>
      </RightArea>
    </Wrapper>
  );
};

export default CommentBox;

const Wrapper = styled.article`
  width: 100%;
  display: flex;
  gap: 20px;

  padding: 16px 18px;

  border-radius: ${({ theme }) => theme.radius.basic};
  background-color: ${({ theme }) => theme.colors.bgBlack};
`;

const LeftArea = styled.div`
  ${({ theme }) => theme.flex.center}
`;

const RightArea = styled.div`
  width: 100%;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.between}
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

const Header = styled.h5`
  color: ${({ theme }) => theme.colors.lightGray};
  text-align: left;
`;

const BodyWrapper = styled.div`
  width: 100%;
  margin-top: 5px;
`;

const Comment = styled.div`
  ${({ theme }) => theme.fonts.comment}
  text-align: left;

  overflow: scroll;
`;
