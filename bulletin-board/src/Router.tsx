import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, Signin, Signup, AddContent, ViewContent } from './pages';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addContent" element={<AddContent />} />
        <Route path="/content/:id" element={<ViewContent />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
