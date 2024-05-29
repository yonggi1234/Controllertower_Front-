import React, { useState, useEffect } from 'react';
import VideoPopup from './navPopup'; // VideoPopup 컴포넌트 불러오기
import '../../style/nav.css';

const CameraListItem = ({ cameraName, onClick }) => (
    <div className="li" onClick={onClick}>
        {cameraName}
    </div>
);

const WarningListItem = ({ warning, onClick }) => (
    <div className="wli" onClick={onClick}>
        {warning}
    </div>
);

const Nav = () => {
    const [cameraList, setCameraList] = useState([]);
    const [warnings, setWarnings] = useState([]);
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

    useEffect(() => {
        // Fetching all warning data at once
        const warningURLs = Array.from({ length: 6 }, (_, i) => `https://gamst.omoknooni.link/video/${i + 1}/risk/`);

        Promise.all(
            warningURLs.map(url =>
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.results) {
                            return data.results.map(result => ({
                                id: parseInt(url.match(/\/video\/(\d+)\/risk/)[1]), // Extract the number from the URL
                                url: result.clip_url,
                                type: 'Video'
                            }));
                        } else {
                            console.error('Invalid video data:', data);
                            return [];
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching video data:', error);
                        return [];
                    })
            )
        )
        .then(warningsData => {
            // Flatten the array of arrays into a single array of warnings
            const mergedWarnings = warningsData.flat();
            setWarnings(mergedWarnings);
        });

        // SSE Setup
        const eventSource = new EventSource('https://gamst.omoknooni.link/camera/stream/');
        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            const newCamera = {
                id: eventData.id,
                url: eventData.section_video_url,
                type: 'Camera'
            };
            setWarnings(prevWarnings => [newCamera, ...prevWarnings]);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const handleWarningClick = (videoUrl, type, id) => {
        if (type === 'Camera') {
            window.open(videoUrl, '_blank');
        } else {
            setSelectedVideoUrl(videoUrl);
            setIsModalOpen(true);
        }
    };

    const handleClosePopup = () => {
        setIsModalOpen(false);
        setSelectedVideoUrl(null);
    };

    const handleVideoClick = (file) => {
        setSelectedVideoUrl(file);
        setIsModalOpen(true);
    };

    return (
        <div className="left_content">
            <div className="list">
                <div className="list_header">
                    <p>🎞️VIDEOS</p>
                </div>
                <div className="camera_list" id="cameraList">
                    {/* camera 리스트 */}
                    {cameraList.map((camera, index) => (
                        <CameraListItem key={index} cameraName={camera} onClick={() => handleVideoClick(null)} />
                    ))}
                    {/* video 리스트 */}
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
                    {/* Warning List */}
                    {warnings.map((warning, index) => (
                        <WarningListItem 
                            key={index} 
                            warning={warning.type === 'Video' ? `Warning for video ${warning.id}` : 'Camera'} 
                            onClick={() => handleWarningClick(warning.url, warning.type, warning.id)} 
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && selectedVideoUrl && (
                <VideoPopup videoUrl={selectedVideoUrl} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default Nav;
