import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const VideoPopup = ({ mediaUrl, mediaType, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleWindowClose = (e) => {
            e.preventDefault();
            onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('beforeunload', handleWindowClose);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('beforeunload', handleWindowClose);
        };
    }, [onClose]);

    return (
        <div className="popup-container">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>
                    <MdClose style={{ fontSize: '32px', cursor: 'pointer', zIndex: 1000 }} />
                </button>
                {mediaType === 'video' ? (
                    <video src={mediaUrl} controls autoPlay className="popup-video" />
                ) : (
                    <img src={mediaUrl} alt="" className="popup-video" />
                )}
            </div>
        </div>
    );
};

export default VideoPopup;
