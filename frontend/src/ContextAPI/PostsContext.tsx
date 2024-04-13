// Import the necessary dependencies
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL } from '../config';

export interface PostInfo {
  id: number;
  title: string;
  content: string;
  name?: string;
  date?: string;
}

interface PostsContextType {
  posts: PostInfo[];
  getPosts: (id?: string) => Promise<void>;
  createPost: (post: PostInfo) => Promise<void>;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  getPosts: async () => {},
  createPost: async () => {},
});

interface PostsProviderProps {
  children: ReactNode;
}

const PostsContextProvider: React.FC<PostsProviderProps> = ({ children }) => {
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
      const response = await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      setPosts([...posts, data]);
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
