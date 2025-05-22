import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // URL 파라미터 가져오기 위해 사용
import './PostDetail.css'; // 스타일을 위한 CSS 파일
import { getDummyPostDetail } from '../data/dummyData'; // 가짜 데이터 가져오기 (아래 설명)

const PostDetail = () => {
    // URL에서 트윗 ID 가져오기
    const { postId } = useParams();
    // 선택된 트윗 상세 정보를 저장할 상태
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 컴포넌트가 마운트되거나 postId가 변경될 때 데이터 가져오기 (나중에 API 호출로 변경)
        setLoading(true);
        setError(null);
        try {
            // 가짜 데이터 불러오기
            const dummyPost = getDummyPostDetail(postId); // 함수 호출 예시 (실제 구현 필요)
            if (dummyPost) {
                setPost(dummyPost);
            } else {
                setError('해당 트윗을 찾을 수 없습니다.');
            }
        } catch (err) {
            setError('데이터를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, [postId]); // postId가 변경될 때마다 effect 실행

    if (loading) {
        return <div className="post-detail-container">로딩 중...</div>;
    }

    if (error) {
        return <div className="post-detail-container error">{error}</div>;
    }

    // post가 null이 아니면 상세 내용 표시
    return (
        <div className="post-detail-container">
            <h2>트윗 상세 보기</h2>
            {post ? (
                <div className="post-detail-content">
                    <h3>{post.author}</h3> {/* 가짜 작성자 정보 */}
                    <p>{post.content}</p>
                    {/* 댓글 목록 등 추가 정보는 디자인 가이드 참고 */}
                    <small>{post.date}</small> {/* 가짜 작성 날짜 */}
                </div>
            ) : (
                <div>트윗 정보를 불러올 수 없습니다.</div>
            )}
        </div>
    );
};

export default PostDetail;
