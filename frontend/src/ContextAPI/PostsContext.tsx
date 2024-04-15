// Import the necessary dependencies
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AccountContext } from './AccountContext';
import { BASE_URL } from '../config';

export interface PostInfo {
  id?: number;
  title: string;
  content: string;
  name?: string;
  date?: string;
}

interface PostsContextType {
  posts: PostInfo[];
  getPosts: (id?: string) => Promise<void>;
  createPost: (post: PostInfo) => Promise<boolean>;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  getPosts: async () => {},
  createPost: async () => false,
});

interface PostsProviderProps {
  children: ReactNode;
}

const PostsContextProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const { sessionJWT } = useContext(AccountContext);
  const [posts, setPosts] = useState<PostInfo[]>([]);

  const getPosts = async (id?: string) => {
    id = id || '';
    try {
      const response = await fetch(`${BASE_URL}/posts?id=${id}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async (post: PostInfo) => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionJWT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      if (response.status === 200) {
        setPosts([...posts, data]);
        return true;
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <PostsContext.Provider value={{ posts, getPosts, createPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsContextProvider };
