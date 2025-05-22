export const dummyPosts = [
    {
        id: '1', 
        author: '익명의 사용자 1', 
        content: '첫 번째 가짜 트윗 내용입니다. 안녕하세요! 😊 퍼블리싱 단계에서 UI 확인용으로 사용되는 데이터입니다.', // 트윗 내용 (가짜)
        date: '2024-05-20', 
        
        likes: 15,
        commentsCount: 3,
       
    },
    {
        id: '2',
        author: '개발자 B',
        content: '두 번째 테스트 트윗입니다. 컴포넌트 분리 연습 중!',
        date: '2024-05-21',
        likes: 8,
        commentsCount: 1,
    },
    {
        id: '3',
        author: '프론트엔드 마스터',
        content: '퍼블리싱 거의 완료! 이제 백엔드랑 연결만 남았네요. 힘내자! 💪',
        date: '2024-05-22',
        likes: 25,
        commentsCount: 5,
    },
    
];

export const getDummyPostDetail = (postId) => {
   
    const foundPost = dummyPosts.find(post => post.id === postId);

    return foundPost;
};



export const dummyUserProfile = {
    id: 'currentUser', // 사용자를 식별하는 ID (가짜)
    name: '이유진', // 사용자 이름 (가짜)
    username: 'leeyujin_dev', // 사용자 핸들 또는 ID (가짜)
    bio: 'EFUB 인턴 토이 프로젝트 프론트엔드 개발 중입니다! 💻', // 자기소개 (가짜)
    profileImage: 'https://via.placeholder.com/150', // 가짜 프로필 이미지 URL (Placeholder 이미지 사용)
    joinedDate: '2023-08-01', 
    postsCount: 123,
    following: 50,
    followers: 150, 
    
};


export const getDummyUserProfile = (userId) => {
    
    console.log(`가짜 프로필 정보 요청됨 (요청 ID: ${userId})`);
    return dummyUserProfile;
};