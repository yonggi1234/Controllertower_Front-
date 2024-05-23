import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import VideoPopup from './Popup'; 
import '../../style/body.css'; 

function LocalVideoPlayer() {
    const screenRef = useRef(null);
    const [streamUrl, setStreamUrl] = useState('');
    const [videoFiles, setVideoFiles] = useState([
        'fight_148.mp4',
        'fight_149.mp4',
        'datefight_24.mp4',
        'fight_150.mp4',
        'fight_151.mp4',
        'kidnap_5.mp4'
    ]);
    const [popupVideoUrl, setPopupVideoUrl] = useState(null);

    useEffect(() => {
        // URL에서 스트림 데이터 가져오기
        axios.get('https://gamst.omoknooni.link/camera/')
            .then(response => {
                const streamUrl = response.data.results[0].stream_url;
                setStreamUrl(streamUrl);
            })
            .catch(error => {
                console.error('Error fetching stream URL:', error);
            });
    }, []);

    // 스크린 리사이즈 시 비디오 조정
    useEffect(() => {
        const resizeVideos = () => {
            const screen = screenRef.current;
            if (!screen) return;

<<<<<<< HEAD
            const screenboxWidth = screen.clientWidth;
            const screenboxHeight = screen.clientHeight;
=======
            const videos = screen.querySelectorAll('video');
>>>>>>> origin/yonggi

            const cols = 3;
            const rows = 2; 
            
<<<<<<< HEAD
            const width = (screenboxWidth - 20) / cols - 2 * cols; 
            const height = (screenboxHeight - 20) / rows - 2 * rows;

            const videos = screen.querySelectorAll('video');

            videos.forEach(video => {
                video.style.width = `${width}px`;
                video.style.height = `${height}px`;
=======
            const width=(screen.getBoundingClientRect().width-20)/(cols)-2*(cols); 
            const height=(screen.getBoundingClientRect().height-20)/(rows)-2*(rows);




            videos.forEach(video => {
                video.style.width = `${width}px`;
                video.style.height = `${height}px
                `;
>>>>>>> origin/yonggi
            });
        };

        window.addEventListener('resize', resizeVideos);
        resizeVideos();

        return () => {
            window.removeEventListener('resize', resizeVideos);
        };
    }, []);

    const handleVideoClick = (src) => {
        setPopupVideoUrl(src);
    };

    const handleClosePopup = () => {
        setPopupVideoUrl(null);
    };

    return (
        <div className="content">
            <div className="screen" ref={screenRef}>
<<<<<<< HEAD
=======
                {/* <video src="https://omoknooni-gamst-video.s3.amazonaws.com/clip/output_240522162121"></video> */}
                {/* {streamUrl && (
                )} */}
                {/* <img src={'http://52.79.81.216:7500/stream.mjpg'} controls autoPlay /> */}
                

>>>>>>> origin/yonggi
                {videoFiles.map((fileName, index) => (
                    <video
                        className='local-video'
                        key={index}
                        controls={false}
                        autoPlay
                        muted
                        src={require(`../../source/${fileName}`)}
                        type="video/mp4"
                        onClick={() => handleVideoClick(require(`../../source/${fileName}`))}
                    />
                ))}
            </div>
            {popupVideoUrl && (
                <VideoPopup videoUrl={popupVideoUrl} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default LocalVideoPlayer;
