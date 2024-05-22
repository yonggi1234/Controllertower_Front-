import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

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

            const cols = 3;
            const rows = 2; 
            
            const width=(screen.getBoundingClientRect().width-20)/(cols)-2*(cols); 
            const height=(screen.getBoundingClientRect().height-20)/(rows)-2*(rows);




            videos.forEach(video => {
                video.style.width = `${width}px`;
                video.style.height = `${height}px
                `;
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
                {/* <video src="https://omoknooni-gamst-video.s3.amazonaws.com/clip/output_240522162121"></video> */}
                {/* {streamUrl && (
                )} */}
                {/* <img src={'http://52.79.81.216:7500/stream.mjpg'} controls autoPlay /> */}
                

                {videoFiles.map((fileName, index) => (
                    <video
                        key={index}
                        controls={false}
                        autoPlay
                        muted
                        src={require(`../../source/${fileName}`)}
                        type="video/mp4"
                    />
                ))}
            </div>
        </div>
    );
}

export default LocalVideoPlayer;
