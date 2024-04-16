import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AccountContext } from './AccountContext';
import { commentsService } from '../apis/commentsService';
import { AxiosResponse } from 'axios';
export interface CommentInfo {
  id?: number;
  postId?: string;
  content: string;
  name?: string;
  colorCode?: string;
  date?: Date;
}

interface CommentsContextType {
  comments: CommentInfo[];
  getComments: (id?: string) => Promise<AxiosResponse>;
  createComment: (post: CommentInfo) => Promise<AxiosResponse>;
  deleteComment: (id: number) => Promise<AxiosResponse>;
}

const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  getComments: async () => null,
  createComment: async () => null,
  deleteComment: async () => null,
});

interface CommentsProviderProps {
  children: ReactNode;
}

const CommentsContextProvider: React.FC<CommentsProviderProps> = ({
  children,
}) => {
  const { sessionJWT } = useContext(AccountContext);
  const [comments, setComments] = useState<CommentInfo[]>([]);

  const getComments = async (id?: string) => {
    id = id || '';
    try {
      const response = await commentsService.getComments(id);
      setComments(response.data);
      return response;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error(error);
    }
  };

  const createComment = async (commentData: CommentInfo) => {
    if (!sessionJWT) {
      throw new Error('로그인이 필요한 기능입니다.');
    }

    try {
      const response = await commentsService.createComment(
        commentData,
        sessionJWT,
      );

      if (response.status === 201) {
        setComments([...comments, response.data]);
        return response;
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      return error;
    }
  };

  const deleteComment = async (id: number) => {
    if (!sessionJWT) {
      throw new Error('로그인이 필요한 기능입니다.');
    }

    try {
      const response = await commentsService.deleteComment(id, sessionJWT);

      if (response.status === 200) {
        setComments(comments.filter(comment => comment.id !== id));
        return response;
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      if (error.response.status === 403) {
        throw new Error('권한이 없습니다.');
      } else {
        throw new Error('댓글 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <CommentsContext.Provider
      value={{ comments, getComments, createComment, deleteComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentsContext, CommentsContextProvider };
