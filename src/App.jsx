import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CoursesListPage from './pages/CoursesListPage';
import CreatePostPage from './pages/CreatePostPage';
import AllPostsPage from './pages/AllPostsPage';
import SinglePostPage from './pages/SinglePostPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CoursesListPage />} />
        <Route path="/create-post/:courseIdentifier" element={<CreatePostPage />} />
        <Route path="/posts" element={<AllPostsPage />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />


      </Routes>
    </div>
  );
}

export default App;