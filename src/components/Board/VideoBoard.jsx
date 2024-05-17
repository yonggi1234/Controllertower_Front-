import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../Fetch/fetchVideo';
import ScreenRef from '../Board/ScreenRef';
import Test from '../Board/test';

function VideoBoard() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos()
            .then(data => setVideos(data))
            .catch(error => console.error('Error setting videos:', error));
    }, []);

    return (
        <div>
            <Test/>
            {/* <ScreenRef videos={videos} /> */}
        </div>
    );
}

export default VideoBoard;