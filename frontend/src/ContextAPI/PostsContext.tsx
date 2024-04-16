import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AccountContext } from './AccountContext';
import { postService } from '../apis/postsService';
import { AxiosResponse } from 'axios';

export interface PostInfo {
  id?: number;
  title: string;
  content: string;
  colorCode?: string;
  name?: string;
  date?: string;
}

interface PostsContextType {
  posts: PostInfo[];
  getPosts: (id?: string) => Promise<AxiosResponse>;
  createPost: (post: PostInfo) => Promise<AxiosResponse>;
  deletePost: (id: number) => Promise<AxiosResponse>;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  getPosts: async () => null,
  createPost: async () => null,
  deletePost: async () => null,
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
      const response = await postService.getPosts(id);
      setPosts(response.data);
      return response;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error(error);
    }
  };

  const createPost = async (post: PostInfo) => {
    if (!sessionJWT) {
      throw new Error('로그인이 필요한 기능입니다.');
    }

    try {
      const response = await postService.createPost(post, sessionJWT);

      if (response.status === 201) {
        setPosts([...posts, response.data]);
        return response;
      }
    } catch (error) {
      console.error('Error creating post:', error);
      return error;
    }
  };

  const deletePost = async (id: number) => {
    if (!sessionJWT) {
      throw new Error('로그인이 필요한 기능입니다.');
    }

    try {
      const response = await postService.deletePost(id, sessionJWT);

      if (response.status === 200) {
        setPosts(posts.filter(post => post.id !== id));
        return response;
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      if (error.response.status === 403) {
        throw new Error('권한이 없습니다.');
      } else {
        throw new Error('글 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <PostsContext.Provider value={{ posts, getPosts, createPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsContextProvider };
