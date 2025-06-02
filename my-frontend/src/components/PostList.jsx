import React, { useEffect, useState } from 'react'; // useEffect와 useState 훅을 사용합니다.
import './PostList.css'; // 스타일 파일 임포트
import PostItem from './PostItem'; // 개별 트윗 아이템 컴포넌트 임포트

// 백엔드 API URL
const API_BASE_URL = 'https://api.efubtwitter.o-r.kr'; // 백엔드 서버 기본 주소

// 가짜 데이터는 더 이상 필요 없으므로 임포트를 제거합니다.
// import { dummyPosts } from '../data/dummyData';

const PostList = () => {
    // API에서 받아온 실제 트윗 목록을 저장할 상태입니다. 초기값은 빈 배열입니다.
    const [posts, setPosts] = useState([]);
    // API 호출이 진행 중인지 나타내는 로딩 상태입니다. 초기값은 true로 설정하여 시작 시 로딩을 표시합니다.
    const [loading, setLoading] = useState(true);
    // API 호출 실패 시 에러 메시지를 저장할 상태입니다. 초기값은 null입니다.
    const [error, setError] = useState(null);

    // --- 삭제 기능 관련 코드 (API 연동은 나중에 구현) ---
    // handleDeletePost 함수는 현재는 가짜 데이터만 삭제하는 로직 (또는 콘솔 출력)입니다.
    // 실제 백엔드 API와 연동하여 삭제 기능을 구현할 때 이 함수 내부 코드를 수정합니다.
    const handleDeletePost = (postId) => {
        console.log(`Delete request for post ID: ${postId} (API call pending)`);
        // // 실제 '트윗 삭제' API 호출 및 처리 로직은 여기에 추가됩니다. 예:
        // const confirmDelete = window.confirm('정말로 이 트윗을 삭제하시겠습니까?'); // 사용자 확인 (간단한 예시)
        // if (confirmDelete) {
        //     const deletePostApi = async () => {
        //         try {
        //             // API 명세서의 삭제 엔드포인트 URL과 HTTP 메서드(DELETE) 사용
        //             const response = await fetch(`${API_BASE_URL}/api/tweets/${postId}`, {
        //                 method: 'DELETE',
        //             });
        //
        //             if (!response.ok) {
        //                 // 에러 응답 처리
        //                 const errorDetail = await response.text();
        //                 throw new Error(`Deletion failed: ${response.status} - ${errorDetail}`);
        //             }
        //
        //             // 삭제 성공 후 프론트엔드 상태 업데이트: 삭제된 트윗을 목록에서 제거
        //             setPosts(posts.filter(post => post.id !== postId));
        //             console.log(`Post ${postId} deleted successfully.`);
        //             // 삭제 성공 알림 등을 추가할 수 있습니다.
        //
        //         } catch (err) {
        //             console.error('Error deleting post:', err);
        //             setError(`트윗 삭제에 실패했습니다: ${err.message}`); // 에러 상태 업데이트 (UI에 표시 가능)
        //             alert(`트윗 삭제에 실패했습니다: ${err.message}`); // 사용자에게 알림
        //         }
        //     };
        //     deletePostApi();
        // }
    };
    // --- 삭제 기능 관련 코드 끝 ---


    // useEffect 훅을 사용하여 컴포넌트가 처음 마운트될 때 (렌더링 완료 후) API를 호출합니다.
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true); // API 호출 시작 시 로딩 상태를 true로 설정
                setError(null); // 새로운 호출 시작 시 이전 에러 상태 초기화

                // 백엔드 API 명세서에서 확인한 '전체 트윗 목록 조회' 엔드포인트 URL을 사용합니다.
                const apiUrl = `${API_BASE_URL}/api/tweets`; // API 기본 주소와 엔드포인트 결합

                // fetch 함수를 사용하여 GET 요청을 보냅니다. (GET은 기본값이므로 method 생략 가능)
                const response = await fetch(apiUrl);

                // HTTP 응답 상태가 200번대(성공)가 아니면 에러 처리
                if (!response.ok) {
                     // 에러 응답 본문을 확인하여 상세 에러 메시지를 가져오려고 시도합니다.
                     const errorDetail = await response.text(); // 응답 본문을 텍스트로 먼저 가져옵니다.
                     let errorMessage = `데이터를 불러오는데 실패했습니다: ${response.status}`;
                     try {
                         // 텍스트가 JSON 형식이라면 파싱하여 에러 메시지를 추가합니다.
                         const errorJson = JSON.parse(errorDetail);
                         errorMessage += ` - ${errorJson.message || errorDetail}`; // 백엔드 에러 메시지 필드를 확인하세요.
                     } catch (parseError) {
                         // JSON 파싱 실패 시 원본 텍스트 에러 메시지를 사용합니다.
                         errorMessage += ` - ${errorDetail}`;
                     }
                     // 사용자 정의 에러 객체를 던져 catch 블록에서 잡도록 합니다.
                     throw new Error(errorMessage);
                 }

                // 응답 본문을 JSON 형태로 파싱합니다.
                const data = await response.json();

                // API 명세서에서 확인한 데이터 구조와 일치하는지 확인하며 상태 업데이트합니다.
                // 만약 API 응답이 { tweets: [...] } 또는 { data: [...] } 형태라면
                // setPosts(data.tweets); 또는 setPosts(data.data); 와 같이 접근해야 할 수 있습니다.
                // API 명세서와 실제 응답 데이터를 확인하여 올바르게 설정하세요.
                setPosts(data); // 받아온 데이터로 posts 상태 업데이트

            } catch (error) {
                // fetch 자체가 실패하거나 (네트워크 오류 등) 위에서 throw new Error로 던져진 에러를 여기서 잡습니다.
                console.error('트윗 목록 가져오기 오류:', error);
                // 사용자에게 보여줄 에러 메시지를 상태에 저장합니다.
                setError(`트윗 목록을 불러오는 데 실패했습니다. ${error.message}`);
            } finally {
                // API 호출이 완료되었으므로 (성공 또는 실패 모두) 로딩 상태를 false로 설정합니다.
                setLoading(false);
            }
        };

        // 정의한 비동기 API 호출 함수 fetchPosts를 실행합니다.
        fetchPosts();

    }, []); // 의존성 배열이 비어있으므로 컴포넌트가 처음 마운트될 때 딱 한 번만 실행됩니다.


    // 로딩 중일 때 화면에 보여줄 UI를 반환합니다.
    if (loading) {
        return (
            <div className="post-list-container">
                <h2>전체 트윗</h2>
                <p>트윗 로딩 중...</p>
            </div>
        );
    }

    // API 호출 중 에러 발생 시 화면에 보여줄 UI를 반환합니다.
    if (error) {
        return (
            <div className="post-list-container">
                 <h2>전체 트윗</h2>
                 {/* 에러 메시지를 빨간색 등으로 표시하도록 CSS 클래스를 사용할 수 있습니다. */}
                 <p className="error-message">오류: {error}</p>
            </div>
        );
    }

    // 로딩도 아니고 에러도 없을 때 (데이터를 성공적으로 받아왔거나 목록이 비어있을 때) 트윗 목록을 보여줍니다.
    return (
        <div className="post-list-container">
            <h2>전체 트윗</h2>
            <div className="post-list">
                {/* posts 배열의 길이가 0보다 크면 (데이터가 있으면) 목록을 순회하며 PostItem 컴포넌트를 렌더링합니다. */}
                {/* 그렇지 않으면 "표시할 트윗이 없습니다" 메시지를 보여줍니다. */}
                {posts.length > 0 ? (
                    posts.map(post => (
                        // PostItem 컴포넌트에 API에서 받아온 개별 트윗 객체를 props로 전달합니다.
                        // key prop은 리스트 렌더링 시 필수이며, API 데이터의 고유 ID (post.id)를 사용합니다.
                        // post 객체의 속성 이름(id, author, content, date 등)은 백엔드 API 명세서와 정확히 일치해야 합니다.
                        // 만약 API 응답 데이터의 속성 이름이 다르다면 (예: post.writer 대신 post.author),
                        // PostItem 컴포넌트에서 해당 속성에 접근할 때 API 응답 데이터의 실제 속성 이름을 사용해야 합니다.
                        <PostItem
                            key={post.id}
                            post={post} // API에서 받아온 개별 트윗 객체 전체를 PostItem에 전달
                            onDelete={handleDeletePost} // 삭제 함수 전달 (현재는 로컬 또는 콘솔)
                        />
                    ))
                ) : (
                    // posts 배열이 비어있을 때 보여줄 메시지
                    // 백엔드에서 빈 배열을 주는 경우 또는 오류가 아닌 경우에 해당합니다.
                    <div>표시할 트윗이 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default PostList;
