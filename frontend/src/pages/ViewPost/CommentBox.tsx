import React, { useContext } from 'react';
import { CommentsContext } from '../../ContextAPI/CommentsContext';
import { Icon } from '../../components';
import styled from 'styled-components';

export interface CommentInfo {
  postId?: number;
  id?: number;
  name: string;
  content: string;
}

const CommentBox: React.FC<CommentInfo> = ({ id, name, content }) => {
  const { deleteComment: deleteCommentApi } = useContext(CommentsContext);
  const deleteComment = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      if (deleteCommentApi(id)) {
        // window.alert('댓글 삭제 성공!');
        // window.location.reload();
      } else {
        window.alert('댓글 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <LeftArea>
          <Icon
            icon="user"
            iconStyle={{ size: '16', color: 'darkGray', disable: true }}
          />
          <Header>{name}</Header>
        </LeftArea>
        <RightArea>
          <Icon
            icon="trash"
            iconStyle={{ size: '14', color: 'red', disable: false }}
            onClickHandler={deleteComment}
          />
        </RightArea>
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
  ${({ theme }) => theme.flex.between}
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

const LeftArea = styled.div`
  ${({ theme }) => theme.flex.left}
`;

const RightArea = styled.div`
  ${({ theme }) => theme.flex.right}
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
