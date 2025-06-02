import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // URL 파라미터 가져오기 위해 사용
import './PostDetail.css'; // 스타일을 위한 CSS 파일

// 백엔드 API URL
const API_BASE_URL = 'https://api.efubtwitter.o-r.kr'; // 백엔드 서버 기본 주소

// 가짜 데이터 임포트는 더 이상 필요 없습니다.
// import { getDummyPostDetail } from '../data/dummyData';


const PostDetail = () => {
    // URL에서 라우팅 파라미터로 전달된 트윗 ID를 가져옵니다.
    const { postId } = useParams();

    // 선택된 트윗의 상세 정보를 저장할 상태입니다. 초기값은 null입니다.
    const [post, setPost] = useState(null);
    // API 호출 중 로딩 상태를 보여주기 위한 상태입니다.
    const [loading, setLoading] = useState(true);
    // API 호출 실패 시 에러 메시지를 보여주기 위한 상태입니다.
    const [error, setError] = useState(null);

    // useEffect 훅을 사용하여 컴포넌트가 마운트되거나 URL 파라미터인 postId가 변경될 때 API를 호출합니다.
    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                setLoading(true); // API 호출 시작 시 로딩 상태를 true로 설정
                setError(null); // 새로운 호출 시작 시 이전 에러 상태 초기화
                setPost(null); // 새로운 트윗 정보 로딩 시작 시 이전 데이터 초기화 (선택 사항)

                // --- 가짜 데이터 대신 실제 API 호출 ---
                // 백엔드 API 명세서에서 확인한 '개별 트윗 상세 조회' 엔드포인트 URL을 사용합니다.
                // URL에 가져오려는 트윗의 ID를 포함시켜 요청합니다.
                const apiUrl = `${API_BASE_URL}/api/tweets/${postId}`; // 예시 URL (명세서 확인 필요)

                // fetch 함수를 사용하여 GET 요청을 보냅니다.
                const response = await fetch(apiUrl);

                // HTTP 응답 상태가 200번대(성공)가 아니면 에러 처리
                if (!response.ok) {
                     const errorDetail = await response.text();
                     let errorMessage = `트윗 상세 정보를 불러오는데 실패했습니다: ${response.status}`;
                     try {
                         const errorJson = JSON.parse(errorDetail);
                         errorMessage += ` - ${errorJson.message || errorDetail}`;
                     } catch (parseError) {
                         errorMessage += ` - ${errorDetail}`;
                     }
                     throw new Error(errorMessage);
                 }

                // 응답 본문을 JSON 형태로 파싱합니다.
                const data = await response.json();

                // API 명세서에서 확인한 상세 데이터 구조와 일치하는지 확인하며 상태 업데이트합니다.
                // 만약 API 응답이 { post: {...} } 형태라면 setPost(data.post); 와 같이 접근해야 할 수 있습니다.
                if (data) { // 데이터가 성공적으로 왔는지 확인
                     setPost(data); // 받아온 데이터로 post 상태 업데이트
                } else {
                     // API는 성공했으나 데이터가 null 또는 비어있는 경우
                     setError('해당 트윗 정보를 찾을 수 없습니다.');
                     setPost(null); // post 상태를 null로 유지
                }


            } catch (error) {
                // fetch 자체가 실패하거나 (네트워크 오류 등) 위에서 throw new Error로 던져진 에러를 여기서 잡습니다.
                console.error('트윗 상세 정보 가져오기 오류:', error);
                // 사용자에게 보여줄 에러 메시지를 상태에 저장합니다.
                setError(`트윗 상세 정보를 불러오는 데 실패했습니다. ${error.message}`);
                setPost(null); // 에러 발생 시 post 상태 초기화
            } finally {
                // API 호출이 완료되었으므로 (성공 또는 실패 모두) 로딩 상태를 false로 설정합니다.
                setLoading(false);
            }
        };

        // postId 값이 유효할 때만 API 호출 함수를 실행합니다.
        // URL 파라미터가 없을 경우는 없겠지만, 안전하게 확인하는 것이 좋습니다.
        if (postId) {
            fetchPostDetail(); // 정의한 비동기 API 호출 함수 실행
        } else {
             // postId가 없을 경우 (예상치 못한 상황) 바로 에러 처리
             setError('조회할 트윗 ID가 없습니다.');
             setLoading(false);
             setPost(null);
        }


    }, [postId]); // 의존성 배열에 postId를 넣어, postId 값이 변경될 때마다 useEffect 훅이 다시 실행되도록 합니다.


    // 로딩 중일 때 화면에 보여줄 UI를 반환합니다.
    if (loading) {
        return (
            <div className="post-detail-container">
                 <h2>트윗 상세 보기</h2>
                 <p>트윗 상세 정보 로딩 중...</p>
            </div>
        );
    }

    // API 호출 중 에러 발생 시 화면에 보여줄 UI를 반환합니다.
    // post 상태가 null인데 로딩이 끝났다면 오류 메시지를 보여줍니다.
    if (error || !post) { // 에러가 있거나 post 데이터가 없을 경우
        return (
            <div className="post-detail-container">
                 <h2>트윗 상세 보기</h2>
                 {/* 에러 메시지 또는 데이터를 찾을 수 없다는 메시지 표시 */}
                 <p className="error-message">{error || '해당 트윗을 찾을 수 없습니다.'}</p>
            </div>
        );
    }

    // 로딩도 아니고 에러도 없으며 post 데이터가 있을 때 상세 정보를 보여줍니다.
    return (
        <div className="post-detail-container">
            <h2>트윗 상세 보기</h2>
            {/* post 객체의 속성 이름(author, content, date 등)은 백엔드 API 명세서와 정확히 일치해야 합니다. */}
            {/* 만약 API 응답 데이터의 속성 이름이 다르다면 (예: post.writer 대신 post.author),
                여기서 해당 속성에 접근할 때 API 응답 데이터의 실제 속성 이름을 사용해야 합니다. */}
            <div className="post-detail-content">
                <h3>{post.author}</h3> {/* 예시: API 응답에 author 속성이 있다고 가정 */}
                <p>{post.content}</p> {/* 예시: API 응답에 content 속성이 있다고 가정 */}
                {/* 댓글 목록 등 추가 정보는 API 명세서에 있다면 추가로 구현합니다. */}
                {/* 예: post.comments && ( <div>...댓글 목록 렌더링...</div> ) */}
                <small>{post.date}</small> {/* 예시: API 응답에 date 속성이 있다고 가정 */}
                {/* 필요한 경우 수정/삭제 버튼 등 추가 UI 요소 배치 */}
            </div>
        </div>
    );
};

export default PostDetail;
