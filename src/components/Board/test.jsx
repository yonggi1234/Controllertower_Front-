import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

function LocalVideoPlayer() {
    const screenRef = useRef(null);
    const [streamUrl, setStreamUrl] = useState('');
    const [videoFiles, setVideoFiles] = useState([
        'a.mp4',
        'a.mp4',
        'a.mp4',
        'a.mp4',
        'a.mp4',
        'a.mp4',
        'a.mp4'
    ]);

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

            const videos = screen.querySelectorAll('video');
            const N = 4;
            const cols = N;
            const rows = Math.ceil(videos.length / cols);

            const screenWidth = screen.getBoundingClientRect().width;
            const videoWidth = screenWidth / cols;

            videos.forEach(video => {
                video.style.width = `${videoWidth}px`;
                video.style.height = 'auto';
            });
        };

        window.addEventListener('resize', resizeVideos);
        resizeVideos();

        return () => {
            window.removeEventListener('resize', resizeVideos);
        };
    }, []);

    return (
        <div className="content">
            <div className="screen" ref={screenRef}>
                
                {streamUrl && (
                    // <ReactPlayer
                    //     key="stream"
                    //     url={streamUrl}
                    //     playing
                    //     controls={false}
                    //     width="100%"
                    //     height="auto"
                    // />
                    <img src={streamUrl} controls autoPlay />
                )}

                {videoFiles.map((fileName, index) => (
                    <video
                        key={index}
                        controls={false}
                        autoPlay
                        muted
                        width="100%"
                        height="30px"
                        src={require(`../source/${fileName}`)}
                        type="video/mp4"
                    />
                ))}
            </div>
        </div>
    );
}

export default LocalVideoPlayer;
