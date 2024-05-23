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
        // camera Fetch - 처음 접속 시 한 번만 데이터를 가져옴
        fetch('https://gamst.omoknooni.link/camera/')
            .then(response => response.json())
            .then(data => {
                const { results } = data;
                const cameras = results.map(result => result.name);
                setCameraList(cameras);
            })
            .catch(error => console.error('Error fetching camera data:', error));
    }, []); 

    useEffect(() => {
        // video Fetch - 지속적으로 데이터 스트림을 수신함
        const warningURLs = Array.from({ length: 2 }, (_, i) => `https://gamst.omoknooni.link/video/${i + 1}/stream/`);
        const eventSources = warningURLs.map(url => new EventSource(url));

        eventSources.forEach(eventSource => {
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
            eventSources.forEach(eventSource => eventSource.close());
        };
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
                        <CameraListItem key={i + cameraList.length} cameraName={`camera_name${i+1}`} />
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
                        <WarningListItem key={index} warning={`Warning for video ${warning.video_id}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Nav;
