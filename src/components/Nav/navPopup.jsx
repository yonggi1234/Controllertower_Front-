import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const NavPopup = ({ videoUrl, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="popup-container">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>
                    <MdClose style={{ fontSize: '32px', cursor: 'pointer' }} />
                </button>
                <video src={videoUrl} controls autoPlay className="popup-video" />
            </div>
        </div>
    );
};

export default NavPopup;
