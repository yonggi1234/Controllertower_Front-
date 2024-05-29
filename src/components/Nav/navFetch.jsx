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
        // camera Fetch
        fetch('https://gamst.omoknooni.link/camera/')
            .then(response => response.json())
            .then(data => {
                const { results } = data;
                const cameras = results.map(result => result.name);
                setCameraList(cameras);
            })
            .catch(error => console.error('Error fetching camera data:', error));

        // video Fetch
        const warningURLs = Array.from({ length: 6 }, (_, i) => `https://gamst.omoknooni.link/video/${i + 1}/risk/`);

        warningURLs.forEach(url => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data && data.results) {
                        const videoWarnings = data.results.map(result => ({
                            id: result.id,
                            url: result.clip_url
                        }));
                        setWarnings(prevWarnings => [...prevWarnings, ...videoWarnings]);
                    } else {
                        console.error('Invalid video data:', data);
                    }
                })
                .catch(error => console.error('Error fetching video data:', error));
        });

    }, []);

    const handleWarningClick = (videoUrl) => {
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
                            warning={`Warning for video ${warning.id}`} 
                            onClick={() => handleWarningClick(warning.url)} 
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
