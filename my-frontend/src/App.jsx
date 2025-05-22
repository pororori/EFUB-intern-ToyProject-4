import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; 


import NavigationBar from './components/NavigationBar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Profile from './components/Profile';
import PostForm from './components/PostForm';



function App() {
  return (
    
    <Router>
      <div className="app-container">
       
        <NavigationBar />

        
        <div className="main-content">
          
          <Routes>
            
            <Route
              path="/home"
              element={
                <>
                  <PostForm />
                 
                  <PostList /> {/* dummyPosts를 props로 전달하는 방식도 가능: <PostList posts={dummyPosts} /> */}
                  
                </>
              }
            />

            {/* 프로필 화면 라우트 */}
            <Route
              path="/profile"
              element={<Profile />}
            />
            {/* 글 세부 조회 화면 라우트 */}
            {/* URL 파라미터 ':postId'를 통해 어떤 글을 볼지 식별합니다. */}
            <Route
              path="/post/:postId"
              element={<PostDetail />}
            />

            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />


          </Routes>
        </div>
      </div>
    </Router>
  );
}

// App 컴포넌트를 내보내서 index.js 등에서 사용할 수 있도록 합니다.
export default App;
