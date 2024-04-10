import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import AddContent from './pages/AddContent/AddContent';
import ViewContent from './pages/ViewContent/ViewContent';

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
