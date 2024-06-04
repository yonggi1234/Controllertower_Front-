import React, { useState } from 'react';
import VideoPopup from './navPopup';
import '../../style/nav.css';
import FetchWarnings from '../Fetch/fetchWarnings';
import SSEWarnings from '../SSE/SSEWarnings';

const CameraListItem = ({ cameraName, onClick }) => (
    <div className="li" onClick={onClick}>
        {cameraName}
    </div>
);

const WarningListItem = ({ warning, onClick, highlighted }) => (
    <div
        className={`wli ${highlighted ? 'highlight' : ''}`} 
        onClick={onClick}
    >
        {warning}
    </div>
);

const Nav = () => {
    const [cameraList] = useState([]);
    const [warnings, setWarnings] = useState([]);
    const [highlightedData, setHighlightedData] = useState([]);
    const [processedWarnings, setProcessedWarnings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

    const videoFiles = [
        require('../../source/fight_148.mp4'),
        require('../../source/fight_149.mp4'),
        require('../../source/datefight_24.mp4'),
        require('../../source/fight_150.mp4'),
        require('../../source/fight_151.mp4'),
        require('../../source/kidnap_5.mp4')
    ];

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleWarningClick = (videoUrl, type) => {
        setSelectedVideoUrl(videoUrl);
        setIsModalOpen(true);
    };

    const handleClosePopup = () => {
        setIsModalOpen(false);
        setSelectedVideoUrl(null);
    };

    const handleVideoClick = (file) => {
        setSelectedVideoUrl(file);
        setIsModalOpen(true);
    };

    const isHighlighted = (warning) => {
        return highlightedData.some(item => item.video_uid === warning.video_uid);
    };

    return (
        <div className="left_content">
            <div className="nav_pad">
                <FetchWarnings setWarnings={setWarnings} />
                <SSEWarnings 
                    setWarnings={setWarnings} 
                    setHighlightedData={setHighlightedData} 
                    processedWarnings={processedWarnings}
                    setProcessedWarnings={setProcessedWarnings} 
                />
                <div className="list">
                    <div className="list_header">
                        <p>🎞️VIDEOS</p>
                    </div>
                    <div className="camera_list" id="cameraList">
                        {cameraList.map((camera, index) => (
                            <CameraListItem key={index} cameraName={camera} onClick={() => handleVideoClick(null)} />
                        ))}
                        {videoFiles.map((file, index) => (
                            <CameraListItem
                                key={index + cameraList.length}
                                cameraName={`camera_name${index + 1}`}
                                onClick={() => handleVideoClick(file)}
                            />
                        ))}
                    </div>
                </div>
                <hr className='divider'/>
                <div className="warnings">
                    <div className="warning_header">
                        <p>⚠️ warning</p>
                    </div>
                    <div className="warning_list" id="cameraList">
                            {warnings.map((warning, index) => (
                                <WarningListItem 
                                    key={index} 
                                    warning={warning.type === 'Video' ? `Warning for video ${warning.id}` : `Camera | ${formatDateTime(warning.created_at)}`} 
                                    onClick={() => handleWarningClick(warning.url, warning.type)} 
                                    highlighted={isHighlighted(warning)}
                                />
                            ))}
                    </div>
                </div>

                {isModalOpen && selectedVideoUrl && (
                    <VideoPopup videoUrl={selectedVideoUrl} onClose={handleClosePopup} />
                )}
            </div>
        </div>
    );
}

export default Nav;
