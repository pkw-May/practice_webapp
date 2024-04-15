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
  deletePost: (id: number) => Promise<boolean>;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  getPosts: async () => {},
  createPost: async () => false,
  deletePost: async () => false,
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

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionJWT}`,
        },
      });

      if (response.status === 200) {
        setPosts(posts.filter(post => post.id !== id));
        return true;
      } else if (response.status === 403) {
        alert('권한이 없습니다.');
        return false;
      } else {
        console.error('Error deleting post:', response);
        return false;
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <PostsContext.Provider value={{ posts, getPosts, createPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsContextProvider };
