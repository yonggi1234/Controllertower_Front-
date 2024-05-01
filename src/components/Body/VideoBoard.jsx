import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../Fetch/fetchVideo';
import ScreenRef from '../Body/ScreenRef';

function VideoBoard() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos()
            .then(data => setVideos(data))
            .catch(error => console.error('Error setting videos:', error));
    }, []);

    return (
        <div>
            <ScreenRef videos={videos} />
        </div>
    );
}

export default VideoBoard;