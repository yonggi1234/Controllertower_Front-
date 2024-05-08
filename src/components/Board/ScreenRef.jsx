import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

function ScreenRef({ videos }) {
    const screenRef = useRef(null);
    const videoWidth = useRef(null);
    const videoHeight = useRef(null);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.contentRect) {
                    resizeVideos();
                }
            }
        });
        if (screenRef.current) {
            observer.observe(screenRef.current);
        }
        return () => {
            if (screenRef.current) {
                observer.unobserve(screenRef.current);
            }
        };
    }, []);

    const resizeVideos = () => {
        if (!screenRef.current) return; 

        const N = 3;
        const cols = N;
        const rows = N;
        const totalN = cols * rows;

        const screen = screenRef.current;
        const width = (screen.getBoundingClientRect().width - 20) / cols - 2 * cols;
        const height = (screen.getBoundingClientRect().height - 20) / rows - 2 * rows;

        
        videoWidth.current = width;
        videoHeight.current = height;

        const screenImages = screen.querySelectorAll('.screenImage');
        screenImages.forEach((video, index) => {
            video.style.width = `${width}px`;
            video.style.height = `${height}px`;
        });
    };

    
    const renderVideoGroups = () => {
        const videoGroups = [];
        for (let i = 0; i < videos.length; i += 3) {
            videoGroups.push(videos.slice(i, i + 3));
        }
        return videoGroups.map((videoGroup, index) => (
            <div key={index} className="videoGroup">
                {renderVideos(videoGroup)}
            </div>
        ));
    };

    
    const renderVideos = videoGroup => {
        return videoGroup.map((video, index) => (
            <ReactPlayer
                key={index}
                url={video.url}
                controls={true}
                width={videoWidth.current}
                height={videoHeight.current}
                background-color={'black'}
                className="screenImage"
            />
        ));
    };

    return (
        <div className="content">
            <div className="screen" ref={screenRef}>
                {renderVideoGroups()}
            </div>
        </div>
    );
}

export default ScreenRef;
