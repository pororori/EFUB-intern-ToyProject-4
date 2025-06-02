import React, { useEffect, useState } from 'react';
import './PostList.css';
import PostItem from './PostItem';

// 백엔드 API URL
const API_BASE_URL = 'https://api.efubtwitter.o-r.kr'; // 백엔드 서버 기본 주소

// 가짜 데이터 임포트는 더 이상 필요 없습니다.
// import { dummyPosts } from '../data/dummyData';

const PostList = () => {
    // API에서 받아온 실제 트윗 목록을 저장할 상태입니다. 초기값은 빈 배열입니다.
    const [posts, setPosts] = useState([]);
    // API 호출이 진행 중인지 나타내는 로딩 상태입니다. 초기값은 true로 설정하여 시작 시 로딩을 표시합니다.
    const [loading, setLoading] = useState(true);
    // API 호출 실패 시 에러 메시지를 저장할 상태입니다. 초기값은 null입니다.
    const [error, setError] = useState(null);

    // --- 트윗 목록 불러오기 API 호출 ---
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true); // 로딩 시작
                setError(null); // 이전 에러 초기화

                // '전체 트윗 목록 조회' 엔드포인트 URL
                const apiUrl = `${API_BASE_URL}/api/tweets`; // API 명세서 확인

                const response = await fetch(apiUrl);

                if (!response.ok) {
                     const errorDetail = await response.text();
                     let errorMessage = `데이터를 불러오는데 실패했습니다: ${response.status}`;
                     try {
                         const errorJson = JSON.parse(errorDetail);
                         errorMessage += ` - ${errorJson.message || errorDetail}`;
                     } catch (parseError) {
                         errorMessage += ` - ${errorDetail}`;
                     }
                     throw new Error(errorMessage);
                 }

                const data = await response.json();
                setPosts(data); // 받아온 데이터로 posts 상태 업데이트

            } catch (error) {
                console.error('트윗 목록 가져오기 오류:', error);
                setError(`트윗 목록을 불러오는 데 실패했습니다. ${error.message}`);
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchPosts(); // 컴포넌트 마운트 시 목록 가져오기 실행

    }, []); // 의존성 배열이 비어있으므로 마운트 시 한 번만 실행

    // --- 트윗 삭제 API 호출 ---
    // PostItem 컴포넌트에서 삭제 버튼 클릭 시 호출될 함수입니다.
    const handleDeletePost = async (postId) => { // API 호출을 위해 async 키워드 추가
        // 사용자에게 삭제 확인 메시지를 보여줍니다. (필수 아님, UX 개선 목적)
        const confirmDelete = window.confirm('정말로 이 트윗을 삭제하시겠습니까?');

        // 사용자가 '확인'을 눌렀을 경우에만 삭제 진행
        if (confirmDelete) {
            try {
                // 로딩 상태를 삭제에 대한 것으로 업데이트할 수 있습니다 (선택 사항)
                // setLoading(true); // 예: 삭제 중 로딩 표시

                // 백엔드 API 명세서에서 확인한 '트윗 삭제' 엔드포인트 URL과 HTTP 메서드(DELETE)를 사용합니다.
                const deleteApiUrl = `${API_BASE_URL}/api/tweets/${postId}`; // 예시 URL

                const response = await fetch(deleteApiUrl, {
                    method: 'DELETE', // HTTP 메서드는 DELETE
                    // 필요한 경우 인증 헤더 등을 추가합니다. (API 명세서 참고)
                    // headers: {
                    //     'Authorization': 'Bearer YOUR_TOKEN',
                    // }
                });

                // HTTP 응답 상태가 200번대(성공)가 아니면 에러 처리
                if (!response.ok) {
                     const errorDetail = await response.text();
                     let errorMessage = `트윗 삭제에 실패했습니다: ${response.status}`;
                      try {
                         const errorJson = JSON.parse(errorDetail);
                         errorMessage += ` - ${errorJson.message || errorDetail}`;
                     } catch (parseError) {
                         errorMessage += ` - ${errorDetail}`;
                     }
                    throw new Error(errorMessage);
                }

                // --- 삭제 성공 시 처리 ---
                // 백엔드에서 성공 응답을 받으면, 프론트엔드 상태인 posts 배열에서 해당 트윗을 제거하여 UI를 업데이트합니다.
                setPosts(posts.filter(post => post.id !== postId));
                console.log(`트윗 ${postId} 삭제 성공.`);
                // 사용자에게 삭제 성공 알림 등을 추가할 수 있습니다. 예: alert('트윗이 삭제되었습니다!');

            } catch (err) {
                // API 호출 중 발생하는 에러 (네트워크 문제, 서버 에러 응답 등) 처리
                console.error('트윗 삭제 오류:', err);
                // 사용자에게 실패 메시지를 보여줍니다.
                setError(`트윗 삭제에 실패했습니다: ${err.message}`); // 에러 상태 업데이트 (필요하다면)
                alert(`트윗 삭제에 실패했습니다: ${err.message}`); // 간단한 알림

            } finally {
                 // 삭제 로딩 상태 해제 (선택 사항)
                // setLoading(false);
            }
        } else {
            // 사용자가 '취소'를 눌렀을 경우
            console.log('트윗 삭제가 취소되었습니다.');
        }
    };
    // --- 삭제 기능 관련 코드 끝 ---


    // 트윗 목록 로딩 중일 때 화면에 보여줄 UI
    if (loading) {
        return (
            <div className="post-list-container">
                <h2>전체 트윗</h2>
                <p>트윗 목록 로딩 중...</p>
            </div>
        );
    }

    // 트윗 목록 불러오기 또는 삭제 중 에러 발생 시 화면에 보여줄 UI
    if (error) {
        return (
            <div className="post-list-container">
                 <h2>전체 트윗</h2>
                 <p className="error-message">오류: {error}</p>
            </div>
        );
    }

    // 트윗 목록 데이터가 준비되었을 때 (로딩 완료, 에러 없음)
    return (
        <div className="post-list-container">
            <h2>전체 트윗</h2>
            <div className="post-list">
                {/* posts 배열에 데이터가 있는지 확인하고 목록을 렌더링하거나 메시지를 보여줍니다. */}
                {posts.length > 0 ? (
                    posts.map(post => (
                        <PostItem
                            key={post.id} // 필수: 각 리스트 항목의 고유 키
                            post={post} // API에서 받아온 개별 트윗 데이터 전달
                            onDelete={handleDeletePost} // 삭제 함수 전달
                        />
                    ))
                ) : (
                    // posts 배열이 비어있을 때 메시지
                    <div>표시할 트윗이 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default PostList;
