import React from 'react';
import './DeleteModal.css'; // 스타일을 위한 CSS 파일

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    // isOpen 상태가 false이면 모달을 렌더링하지 않음
    if (!isOpen) {
        return null;
    }

    // 모달 바깥 클릭 시 닫기 (옵션)
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        // 모달 배경 (클릭 시 닫기 기능 포함)
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            {/* 모달 실제 내용 */}
            <div className="modal-content">
                <h3>트윗 삭제 확인</h3>
                <p>정말로 이 트윗을 삭제하시겠습니까?</p>
                <div className="modal-actions">
                    {/* onConfirm 함수는 부모로부터 받아와서 삭제 로직 실행 (나중에 구현) */}
                    <button className="confirm-button" onClick={onConfirm}>삭제</button>
                    {/* onClose 함수는 부모로부터 받아와서 모달 닫기 */}
                    <button className="cancel-button" onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
