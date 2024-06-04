import React, { useEffect, useRef, useState } from 'react';

import VideoPopup from './Popup'; 
import '../../style/body.css'; 

function LocalVideoPlayer() {
    const screenRef = useRef(null);
    const [popupMedia, setPopupMedia] = useState(null);
    const [highlightedData, setHighlightedData] = useState([]);
    const [highlightedImages, setHighlightedImages] = useState({});

    // SSE를 통해 데이터 가져오기
    useEffect(() => {
        const eventSource = new EventSource("https://gamst.omoknooni.link/camera/stream/");
        
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setHighlightedData(prevData => {
                if (prevData.some(item => item.video_uid === data.video_uid)) {
                    return prevData;
                } else {
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
        // 이미지와 비디오의 크기를 동일하게 조정하는 함수
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
                image.style.objectFit = 'cover';
            });
        };

    
        window.addEventListener('resize', resizeMedia);
        resizeMedia();
    
        return () => {
            window.removeEventListener('resize', resizeMedia);
        };
    }, []);

    // 경고 문구 표시
    const showAlert = (index) => {
        const images = screenRef.current?.querySelectorAll('img');
        if (!images || !images[index]) return;

        const alertDiv = document.createElement('div');
        alertDiv.innerText = 'Warning!';
        alertDiv.style.position = 'absolute';
        alertDiv.style.backgroundColor = 'red';
        alertDiv.style.color = 'white';
        alertDiv.style.padding = '10px';
        alertDiv.style.zIndex = '1000';
        alertDiv.style.transform = 'translate(-50%, -50%)';
        alertDiv.style.top = '50%';
        alertDiv.style.left = '50%';

        const image = images[index];
        const parent = image.parentElement;
        parent.style.position = 'relative';
        parent.appendChild(alertDiv);

        image.style.filter = 'blur(3px)';

        setTimeout(() => {
            parent.removeChild(alertDiv);
            image.style.filter = ''; 
        }, 3000);
    };

    // highlightedData가 업데이트 될 때마다 이미지 앞에 경고 문구 표시
    useEffect(() => {
        if (highlightedData.length === 0) return;

        const latestData = highlightedData[highlightedData.length - 1];
        const index = mediaFiles.findIndex(media => media.type === 'image');

        if (index !== -1 && !highlightedImages[latestData.video_uid]) {
            showAlert(index);

            setHighlightedImages(prevImages => ({
                ...prevImages,
                [latestData.video_uid]: true,
            }));
        }
    }, [highlightedData, highlightedImages]);

    // 컴포넌트가 처음 마운트될 때 상태 초기화
    useEffect(() => {
        setHighlightedData([]);
        setHighlightedImages({});
    }, []);

    // 로컬 주소 그대로 유지
    const mediaFiles = [
        { type: 'image', src: 'http://52.79.81.216:7500/stream.mjpg' },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        { type: 'video', src: require('../../source/fight_148.mp4') },
        // { type: 'video', src: require('../../source/fight_149.mp4') },
        // { type: 'video', src: require('../../source/fight_150.mp4') },
        // { type: 'video', src: require('../../source/fight_151.mp4') },
        // { type: 'video', src: require('../../source/kidnap_5.mp4') },
        // { type: 'video', src: require('../../source/datefight_24.mp4') },
    ];

    return (
        <div className='content'>
            <div className="screen" ref={screenRef}>
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
                        <div
                            key={index}
                            className="image-div" 
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={media.src}
                                alt=""
                                onClick={() => handleMediaClick(media)}
                            />
                        </div>
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
