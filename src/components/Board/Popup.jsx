import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPopup = ({ videoUrl, onClose }) => {
    useEffect(() => {
        const handleWindowClose = (e) => {
            e.preventDefault();
            onClose();
        };

        window.addEventListener('beforeunload', handleWindowClose);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        };
    }, [onClose]);

    return (
        <div style={popupStyles.container}>
            <button style={popupStyles.closeButton} onClick={onClose}>Close</button>
            <ReactPlayer url={videoUrl} controls playing width="100%" height="100%" />
        </div>
    );
};

const popupStyles = {
    container: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '600px',
        backgroundColor: 'black',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
    },
    closeButton: {
        alignSelf: 'flex-end',
        margin: '10px',
        padding: '5px 10px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
};

export default VideoPopup;
