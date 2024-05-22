import React, { useState, useEffect } from 'react';
import '../../style/nav.css';

const CameraListItem = ({ cameraName }) => (
    <div className="li">
        {cameraName}
    </div>
);

const WarningListItem = ({ warning }) => (
    <div className="wli">
        {warning}
    </div>
);

const Nav = () => {
    const [cameraList, setCameraList] = useState([]);
    const [warnings, setWarnings] = useState([]);

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
                        const videoWarnings = data.results.map(result => `Warning for video ${result.video}`);
                        setWarnings(prevWarnings => [...prevWarnings, ...videoWarnings]);
                    } else {
                        console.error('Invalid video data:', data);
                    }
                })
                .catch(error => console.error('Error fetching video data:', error));
        });

    }, []);

    return (
        <div className="left_content">
            <div className="list">
                <div className="list_header">
                    <p>🎞️VIDEOS</p>
                </div>
                <div className="camera_list" id="cameraList">
                    {/* camera 리스트 */}
                    {cameraList.map((camera, index) => (
                        <CameraListItem key={index} cameraName={camera} />
                    ))}
                    {/* video 리스트 */}
                    {[...Array(6)].map((_, i) => (
                        <CameraListItem key={i + cameraList.length} cameraName={`camera_name${i + 1}`} />
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
                        <WarningListItem key={index} warning={warning} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Nav;
