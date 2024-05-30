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
            setHighlightedData(prevData => {
                // 중복된 video_uid가 있는지 확인
                if (prevData.some(item => item.video_uid === data.video_uid)) {
                    return prevData;
                } else {
                    // 중복된 video_uid가 없으면 새로운 데이터 추가
                    return [...prevData, data];
                }
            });
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

    //risk 강조
    useEffect(() => {
        highlightedData.forEach((data, index) => {
            setTimeout(() => {
                const images = screenRef.current.querySelectorAll('img');
                if (!images || !images[index]) return;
                images[index].style.border = '';
                images[index].style.cursor = '';
            }, 3000);    // 3초 강조
            const images = screenRef.current.querySelectorAll('img');
            if (!images || !images[index]) return;
            images[index].style.border = '3px solid red';
            images[index].style.cursor = 'pointer';
        });
    }, [highlightedData]);

    // 로컬 주소
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
                            key={index}
                            src={media.src}
                            alt=""
                            onClick={() => handleMediaClick(media)}
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
