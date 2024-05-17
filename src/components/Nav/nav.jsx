import React, { useState, useEffect } from 'react';

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
        // Fetching camera data
        fetch('https://gamst.omoknooni.link/camera/')
            .then(response => response.json())
            .then(data => {
                const { results } = data;
                // Extracting camera names
                const cameras = results.map(result => result.name);
                // Setting camera list
                setCameraList(cameras);
            })
            .catch(error => console.error('Error fetching camera data:', error));

        // Setting up event sources for warnings
        const warningURLs = Array.from({ length: 10 }, (_, i) => `https://gamst.omoknooni.link/video/${i + 1}/stream/`);

        warningURLs.forEach(url => {
            const eventSource = new EventSource(url);

            eventSource.onmessage = (event) => {
                const eventData = JSON.parse(event.data);
                const { id, video_id, start_frame, end_frame, created_at } = eventData;
                const datetime = created_at.split(/[- :]/).map((item) => parseInt(item));

                const newEvent = {
                    id: id,
                    video_id: video_id,
                    start_frame: start_frame,
                    end_frame: end_frame,
                    datetime: datetime
                };

                setWarnings(prevWarnings => [...prevWarnings, newEvent]);
            };
        });

        return () => {
            // Closing event sources
            warningURLs.forEach(url => {
                const eventSource = new EventSource(url);
                eventSource.close();
            });
        };
    }, []);

    return (
        <div className="left_content">
            <div className="list">
                <div className="list_header">
                    <p>🎞️VIDEOS</p>
                </div>
                <div className="camera_list" id="cameraList">
                    {/* Rendering camera list */}
                    {cameraList.map((camera, index) => (
                        <CameraListItem key={index} cameraName={camera} />
                    ))}
                    {/* 추가된 부분 */}
                    {[...Array(10)].map((_, i) => (
                        <CameraListItem key={i + cameraList.length} cameraName={`camera_name${i}`} />
                    ))}
                </div>
                
            </div>
            <hr className='divider'/>
            <div className="warnings">
                <div className="warning_header">
                    <p>⚠️ warning</p>
                </div>
                <div className="warning_list" id="cameraList">
                    {/* Rendering warnings */}
                    {warnings.map((warning, index) => (
                        <WarningListItem key={index} warning={`Warning for video ${warning.video_id}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Nav;
