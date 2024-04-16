import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AccountContext } from './AccountContext';
import { postService } from '../apis/postsService';

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
      const response = await postService.getPosts(id);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async (post: PostInfo) => {
    try {
      const response = await postService.createPost(post, sessionJWT);

      if (response.status === 200) {
        setPosts([...posts, response.data]);
        return true;
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      const response = await postService.deletePost(id, sessionJWT);

      if (response.status === 200) {
        setPosts(posts.filter(post => post.id !== id));
        return true;
      } else {
        console.error('Error deleting post:', response);
        alert('글 삭제에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      if (error.response.status === 403) {
        alert('권한이 없습니다.');
      } else {
        alert('글 삭제에 실패했습니다.');
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
