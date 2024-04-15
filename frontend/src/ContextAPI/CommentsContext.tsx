// Import the necessary dependencies
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AccountContext } from './AccountContext';
import { BASE_URL } from '../config';

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
}

const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  getComments: async () => {},
  createComment: async () => false,
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
      const response = await fetch(`${BASE_URL}/comments?postId=${id}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createComment = async (commentData: CommentInfo) => {
    try {
      const response = await fetch(`${BASE_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Berarer ${sessionJWT}`,
        },
        body: JSON.stringify(commentData),
      });

      const data = await response.json();
      if (response.status === 200) {
        setComments([...comments, data]);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <CommentsContext.Provider value={{ comments, getComments, createComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentsContext, CommentsContextProvider };
