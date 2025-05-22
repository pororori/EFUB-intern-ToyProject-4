import React, { useEffect, useState } from 'react';
import './Profile.css'; // 스타일을 위한 CSS 파일
import { getDummyUserProfile } from '../data/dummyData'; // 가짜 데이터 가져오기 (아래 설명)

const Profile = () => {
    // 사용자 프로필 정보를 저장할 상태
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 데이터 가져오기 (나중에 API 호출로 변경)
        setLoading(true);
        setError(null);
        try {
            // 가짜 데이터 불러오기 (예: 로그인한 사용자 ID에 해당하는 정보)
            const dummyProfile = getDummyUserProfile('currentUser'); // 가짜 사용자 ID 사용
            if (dummyProfile) {
                setUserProfile(dummyProfile);
            } else {
                setError('프로필 정보를 찾을 수 없습니다.');
            }
        } catch (err) {
            setError('프로필 정보를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, []); // 빈 배열을 넣어 컴포넌트 마운트 시에만 실행

    if (loading) {
        return <div className="profile-container">로딩 중...</div>;
    }

    if (error) {
        return <div className="profile-container error">{error}</div>;
    }

    // userProfile이 null이 아니면 프로필 정보 표시
    return (
        <div className="profile-container">
            <h2>나의 프로필</h2>
            {userProfile ? (
                <div className="profile-details">
                    {/* 프로필 사진 (가짜 이미지 또는 아이콘) */}
                    <img src={userProfile.profileImage || 'default-avatar.png'} alt="Profile" className="profile-image"/>
                    <h3>{userProfile.name}</h3> {/* 가짜 사용자 이름 */}
                    <p>@{userProfile.username}</p> {/* 가짜 사용자 핸들 */}
                    <p>{userProfile.bio}</p> {/* 가짜 자기소개 */}
                    {/* 팔로잉, 팔로워 수 등 추가 정보는 디자인 가이드 참고 */}
                    <p>가입일: {userProfile.joinedDate}</p> {/* 가짜 가입일 */}
                </div>
            ) : (
                <div>프로필 정보를 불러올 수 없습니다.</div>
            )}
        </div>
    );
};

export default Profile;
