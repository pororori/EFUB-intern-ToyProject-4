import React from 'react';
import './PostList.css'; // 기존 스타일 파일 임포트 유지
import PostItem from './PostItem';
import { dummyPosts } from '../data/dummyData';

const PostList = () => {
    const [posts, setPosts] = React.useState(dummyPosts); 

    
    const handleDeletePost = (postId) => {
        // postId에 해당하는 트윗을 필터링하여 삭제
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts); // 상태 업데이트
    };

    return (
        <div className="post-list-container">
            <h2>전체 트윗</h2>
            <div className="post-list">
                {posts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                        onDelete={handleDeletePost} // 삭제 함수 전달
                    />
                ))}
            </div>
        </div>
    );
};

export default PostList;