import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, Signin, Signup, ConfirmPage, AddPost, ViewPost } from './pages';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/confirm" element={<ConfirmPage />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/post/:id" element={<ViewPost />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
