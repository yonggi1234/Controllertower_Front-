import React from 'react';
import { MdClose } from 'react-icons/md';

const ListPopup = ({ videoUrl, onClose }) => {
    return (
        <div style={popupStyles.container}>
            <button style={popupStyles.closeButton} onClick={onClose}>
                <MdClose style={{ fontSize: '32px', cursor: 'pointer' }} />
            </button>
            <div style={popupStyles.playerContainer}>
                <video controls autoPlay style={popupStyles.video}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
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
    playerContainer: {
        flex: 1, // Fill remaining space
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        maxWidth: '100%',
        maxHeight: '100%',
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

export default ListPopup;
