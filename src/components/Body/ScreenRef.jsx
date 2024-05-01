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
        if (!screenRef.current) return; // screenRef가 null인 경우 중지

        const N = 3;
        const cols = N;
        const rows = N;
        const totalN = cols * rows;

        const screen = screenRef.current;
        const width = (screen.getBoundingClientRect().width - 20) / cols - 2 * cols;
        const height = (screen.getBoundingClientRect().height - 20) / rows - 2 * rows;

        // 비디오의 너비와 높이 저장
        videoWidth.current = width;
        videoHeight.current = height;

        const screenImages = screen.querySelectorAll('.screenImage');
        screenImages.forEach((video, index) => {
            video.style.width = `${width}px`;
            video.style.height = `${height}px`;
        });
    };

    // 비디오 목록을 그룹으로 나누어 출력
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

    // 비디오 그룹을 출력
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
                {/* 비디오 그룹 출력 */}
                {renderVideoGroups()}
            </div>
        </div>
    );
}

export default ScreenRef;
