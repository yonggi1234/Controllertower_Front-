import React, { useEffect, useRef, useState } from 'react';
import VideoPopup from './Popup'; 
import '../../style/body.css'; 

function LocalVideoPlayer() {
    const screenRef = useRef(null);
    const [popupMedia, setPopupMedia] = useState(null);
    const [highlightedData, setHighlightedData] = useState([]);

    // SSE를 통해 데이터 가져오기
    useEffect(() => {
        const eventSource = new EventSource("https://gamst.omoknooni.link/camera/stream/");
        
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // 가져온 데이터를 저장
            setHighlightedData(prevData => [...prevData, data]);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const handleMediaClick = (media) => {
        setPopupMedia(media);
    };

    const handleClosePopup = () => {
        setPopupMedia(null);
    };

    // 로컬 주소 그대로 유지
    const mediaFiles = [
        { type: 'image', src: 'http://52.79.81.216:7500/stream.mjpg' },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        // require('../../source/fight_149.mp4'),
        // require('../../source/fight_150.mp4'),
        // require('../../source/fight_151.mp4'),
        // require('../../source/datefight_24.mp4'),
        // require('../../source/kidnap_5.mp4')
    ];

    // 스크린 리사이즈 시 미디어 조정
    useEffect(() => {
        const resizeMedia = () => {
            const screen = screenRef.current;
            if (!screen) return;

            const screenboxWidth = screen.clientWidth;
            const screenboxHeight = screen.clientHeight;

            const cols = 3;
            const rows = 2; 
            
            const width = (screenboxWidth - 20) / cols - 2 * cols; 
            const height = (screenboxHeight - 20) / rows - 2 * rows;

            const videos = screen.querySelectorAll('video');
            const images = screen.querySelectorAll('img');

            videos.forEach(video => {
                video.style.width = `${width}px`;
                video.style.height = `${height}px`;
            });

            images.forEach(image => {
                image.style.width = `${width}px`;
                image.style.height = `${height}px`;
            });
        };

        window.addEventListener('resize', resizeMedia);
        resizeMedia();

        return () => {
            window.removeEventListener('resize', resizeMedia);
        };
    }, []);

    // 시간 비교
    useEffect(() => {
        const currentDateTime = new Date();
        const currentDate = currentDateTime.toISOString().slice(0, 10); // YYYY-MM-DD
        const currentSeconds = currentDateTime.getSeconds();

        const highlightedImages = document.querySelectorAll('.highlighted-image');
        highlightedImages.forEach(image => {
            const createdDate = image.dataset.createdDate;
            if (createdDate === currentDate) {
                const createdDateTime = new Date(highlightedData.created_at);
                const createdSeconds = createdDateTime.getSeconds();
                if (currentSeconds === createdSeconds || (currentSeconds - createdSeconds) <= 5) {
                    image.style.border = '3px solid red';
                    image.style.cursor = 'pointer';
                }
            }
        });
    }, [highlightedData]); 

    return (
        <div className="content">
            <div className="screen" ref={screenRef}>
                {/* mediaFiles에서 이미지 및 비디오 출력 */}
                {mediaFiles.map((media, index) => (
                    media.type === 'video' ? (
                        <video
                            className='local-video'
                            key={index}
                            controls={false}
                            autoPlay
                            muted
                            src={media.src}
                            type="video/mp4"
                            onClick={() => handleMediaClick(media)}
                        />
                    ) : (
                        <img
                            className='highlighted-image' 
                            key={index}
                            src={media.src}
                            alt=""
                            onClick={() => handleMediaClick(media)}
                            data-created-date={highlightedData[index]?.created_at?.split('T')[0]}
                        />
                    )
                ))}
            </div>
            {popupMedia && (
                <VideoPopup mediaUrl={popupMedia.src} mediaType={popupMedia.type} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default LocalVideoPlayer;
