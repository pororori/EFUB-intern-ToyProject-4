import React, { useEffect, useState } from 'react';
import './Profile.css'; // 스타일을 위한 CSS 파일

// 백엔드 API URL
const API_BASE_URL = 'https://api.efubtwitter.o-r.kr'; // 백엔드 서버 기본 주소

// 가짜 데이터 임포트는 더 이상 필요 없습니다.
// import { getDummyUserProfile } from '../data/dummyData';


const Profile = () => {
    // 사용자 프로필 정보를 저장할 상태입니다. 초기값은 null입니다.
    const [userProfile, setUserProfile] = useState(null);
    // API 호출 중 로딩 상태를 보여주기 위한 상태입니다.
    const [loading, setLoading] = useState(true);
    // API 호출 실패 시 에러 메시지를 보여주기 위한 상태입니다.
    const [error, setError] = useState(null);

    // 현재 로그인한 사용자의 ID (실제 인증 로직 구현 후 동적으로 가져와야 합니다.)
    // 임시로 하드코딩하거나, 사용자 ID가 필요한 API라면 URL에 직접 포함시킵니다.
    // API 명세서에서 '프로필 조회' 엔드포인트가 특정 사용자 ID를 요구하는지,
    // 아니면 단순히 '내 프로필'을 조회하는 엔드포인트인지 확인하세요.
    const currentUserId = 'placeholderUserId'; // 예시: 임시 사용자 ID (실제 구현 시 변경 필요)


    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 API를 호출합니다.
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true); // API 호출 시작 시 로딩 상태를 true로 설정
                setError(null); // 새로운 호출 시작 시 이전 에러 상태 초기화
                setUserProfile(null); // 새로운 프로필 정보 로딩 시작 시 이전 데이터 초기화 (선택 사항)

                // --- 가짜 데이터 대신 실제 API 호출 ---
                // 백엔드 API 명세서에서 확인한 '프로필 조회' 엔드포인트 URL을 사용합니다.
                // 만약 특정 사용자 ID가 필요한 API라면 URL에 포함시킵니다. (예: /api/users/${currentUserId})
                // 만약 '내 프로필'을 조회하는 엔드포인트라면 사용자 ID 없이 호출합니다. (예: /api/me)
                const apiUrl = `${API_BASE_URL}/api/me`; // 예시 URL ('내 프로필' 엔드포인트라고 가정)
                // 만약 특정 사용자 ID 프로필 조회라면: const apiUrl = `${API_BASE_URL}/api/users/${currentUserId}`;

                // 필요한 경우 인증 헤더를 추가합니다. (로그인한 사용자 정보 조회를 위해 필요할 가능성 높음 - API 명세서 참고)
                const headers = {
                     'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer YOUR_LOGIN_TOKEN', // 로그인 구현 후 추가
                };

                const response = await fetch(apiUrl, { headers }); // 헤더를 포함하여 fetch 호출

                // HTTP 응답 상태가 200번대(성공)가 아니면 에러 처리
                if (!response.ok) {
                     const errorDetail = await response.text();
                     let errorMessage = `프로필 정보를 불러오는데 실패했습니다: ${response.status}`;
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

                // API 명세서에서 확인한 프로필 데이터 구조와 일치하는지 확인하며 상태 업데이트합니다.
                // 만약 API 응답이 { user: {...} } 형태라면 setUserProfile(data.user); 와 같이 접근해야 할 수 있습니다.
                if (data) { // 데이터가 성공적으로 왔는지 확인
                     setUserProfile(data); // 받아온 데이터로 userProfile 상태 업데이트
                } else {
                     // API는 성공했으나 데이터가 null 또는 비어있는 경우
                     setError('프로필 정보를 찾을 수 없습니다.');
                     setUserProfile(null); // userProfile 상태를 null로 유지
                }


            } catch (error) {
                // fetch 자체가 실패하거나 (네트워크 오류 등) 위에서 throw new Error로 던져진 에러를 여기서 잡습니다.
                console.error('프로필 정보 가져오기 오류:', error);
                // 사용자에게 보여줄 에러 메시지를 상태에 저장합니다.
                setError(`프로필 정보를 불러오는 데 실패했습니다. ${error.message}`);
                setUserProfile(null); // 에러 발생 시 userProfile 상태 초기화
            } finally {
                // API 호출이 완료되었으므로 (성공 또는 실패 모두) 로딩 상태를 false로 설정합니다.
                setLoading(false);
            }
        };

        // API 호출 함수 실행
        fetchUserProfile();

    }, []); // 의존성 배열이 비어있으므로 컴포넌트가 마운트될 때 딱 한 번만 실행됩니다. (현재 로그인한 사용자 프로필 조회 기준)
    // 만약 특정 사용자 ID의 프로필을 조회하는 API이고, 해당 ID가 변경될 수 있다면
    // 의존성 배열에 해당 ID 값을 넣어주어야 합니다. 예: [userId]

    // 로딩 중일 때 화면에 보여줄 UI를 반환합니다.
    if (loading) {
        return (
            <div className="profile-container">
                 <h2>나의 프로필</h2>
                 <p>프로필 정보 로딩 중...</p>
            </div>
        );
    }

    // API 호출 중 에러 발생 시 화면에 보여줄 UI를 반환합니다.
    // userProfile 상태가 null인데 로딩이 끝났다면 오류 메시지를 보여줍니다.
     if (error || !userProfile) { // 에러가 있거나 userProfile 데이터가 없을 경우
        return (
            <div className="profile-container">
                 <h2>나의 프로필</h2>
                 {/* 에러 메시지 또는 데이터를 찾을 수 없다는 메시지 표시 */}
                 <p className="error-message">{error || '프로필 정보를 찾을 수 없습니다.'}</p>
            </div>
        );
    }


    // 로딩도 아니고 에러도 없으며 userProfile 데이터가 있을 때 프로필 정보를 보여줍니다.
    return (
        <div className="profile-container">
            <h2>나의 프로필</h2>
            {/* userProfile 객체의 속성 이름(name, username, bio 등)은 백엔드 API 명세서와 정확히 일치해야 합니다. */}
            {/* 만약 API 응답 데이터의 속성 이름이 다르다면 (예: user.fullName 대신 user.name),
                여기서 해당 속성에 접근할 때 API 응답 데이터의 실제 속성 이름을 사용해야 합니다. */}
            <div className="profile-details">
                {/* 프로필 사진: API 응답 데이터의 profileImage URL 사용 */}
                <img src={userProfile.profileImage || 'default-avatar.png'} alt="Profile" className="profile-image"/>
                <h3>{userProfile.name}</h3> {/* 예시: API 응답에 name 속성이 있다고 가정 */}
                <p>@{userProfile.username}</p> {/* 예시: API 응답에 username 속성이 있다고 가정 */}
                <p>{userProfile.bio}</p> {/* 예시: API 응답에 bio 속성이 있다고 가정 */}
                {/* 팔로잉, 팔로워 수 등 추가 정보는 API 명세서에 있다면 추가로 표시 */}
                 <p>팔로잉: {userProfile.followingCount || 0}</p> {/* 예시 */}
                 <p>팔로워: {userProfile.followersCount || 0}</p> {/* 예시 */}
                <p>가입일: {userProfile.joinedDate}</p> {/* 예시: API 응답에 joinedDate 속성이 있다고 가정 */}
            </div>
        </div>
    );
};

export default Profile;
