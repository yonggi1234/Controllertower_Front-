import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../Fetch/fetchVideo';
import VideoList from './videoList';
import ScreenRef  from '../Body/ScreenRef';

function Video() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos()
      .then(data => setVideos(data))
      .catch(error => console.error('Error setting videos:', error));
  }, []);

  return (
    <div>
      <VideoList videos={videos} />
    </div>
  );
}

export default Video;