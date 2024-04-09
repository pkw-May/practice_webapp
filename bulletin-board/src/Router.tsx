import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AddContent from './pages/AddContent/AddContent';
import ViewContent from './pages/ViewContent/ViewContent';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addContent" element={<AddContent />} />
        <Route path="/content/:id" element={<ViewContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
