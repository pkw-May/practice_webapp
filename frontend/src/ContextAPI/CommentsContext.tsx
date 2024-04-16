import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AccountContext } from './AccountContext';
import { commentsService } from '../apis/commentsService';

export interface CommentInfo {
  id?: number;
  postId?: string;
  content: string;
  name?: string;
  date?: Date;
}

interface CommentsContextType {
  comments: CommentInfo[];
  getComments: (id?: string) => Promise<void>;
  createComment: (post: CommentInfo) => Promise<boolean>;
  deleteComment: (id: number) => Promise<boolean>;
}

const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  getComments: async () => {},
  createComment: async () => false,
  deleteComment: async () => false,
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
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createComment = async (commentData: CommentInfo) => {
    try {
      const response = await commentsService.createComment(
        commentData,
        sessionJWT,
      );

      if (response.status === 200) {
        setComments([...comments, response.data]);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const deleteComment = async (id: number) => {
    try {
      const response = await commentsService.deleteComment(id, sessionJWT);
      if (response.status === 200) {
        setComments(comments.filter(comment => comment.id !== id));
        return true;
      } else if (response.status === 403) {
        alert('권한이 없습니다.');
        return false;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
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
