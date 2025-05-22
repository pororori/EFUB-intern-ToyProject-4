import React, { useState } from 'react';
import './PostForm.css'; // 스타일을 위한 CSS 파일

const PostForm = () => {
    // 입력 필드의 상태를 관리
    const [postContent, setPostContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 기본 제출 동작 방지
        // 실제 기능: API 호출하여 글 작성 (나중에 구현)
        console.log('작성할 트윗 내용:', postContent);
        // 입력 필드 초기화
        setPostContent('');
    };

    const handleContentChange = (e) => {
        setPostContent(e.target.value);
    };

    // 사진 첨부 기능은 필수가 아니므로 기본 구조에는 포함하지 않음
    // 필요시 <input type="file"> 요소를 추가하고 상태 관리 로직 추가

    return (
        <div className="post-form-container">
            <h3>새 트윗 작성</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="무슨 생각을 하고 있나요?"
                    value={postContent}
                    onChange={handleContentChange}
                    className="post-textarea"
                />
                <button type="submit" className="post-submit-button">
                    트윗하기
                </button>
            </form>
        </div>
    );
};

export default PostForm;
