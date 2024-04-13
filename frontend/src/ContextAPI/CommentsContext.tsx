// Import the necessary dependencies
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL } from '../config';

export interface CommentInfo {
  id: number;
  title: string;
  content: string;
  name?: string;
  date?: Date;
}

interface CommentsContextType {
  comments: CommentInfo[];
  getComments: (id?: string) => Promise<void>;
  createComment: (post: CommentInfo) => Promise<void>;
}

const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  getComments: async () => {},
  createComment: async () => {},
});

interface CommentsProviderProps {
  children: ReactNode;
}

const CommentsContextProvider: React.FC<CommentsProviderProps> = ({
  children,
}) => {
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

  const createComment = async (post: CommentInfo) => {
    try {
      const response = await fetch(`${BASE_URL}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      setComments([...comments, data]);
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
