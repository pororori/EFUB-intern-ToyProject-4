import React from 'react';
import './PostItem.css'; // 스타일을 위한 CSS 파일
import { Link } from 'react-router-dom'; // 상세 페이지 이동을 위해 Link 사용

const PostItem = ({ post, onDelete }) => { // onDelete 함수도 props로 받음 (삭제 기능 위해)
    return (
        
        <div className="post-item-wrapper"> {}
            <Link to={`/post/${post.id}`} state={{ post: post }} className="post-item-link">
                <div className="post-item-content"> {}
                    <h4>{post.author}</h4> {}
                    <p>{post.content}</p>
                    <small>{post.date}</small> {}
                </div>
            </Link>
             <button className="delete-button" onClick={() => onDelete(post.id)}>삭제</button>

        </div>
    );
};

export default PostItem;
