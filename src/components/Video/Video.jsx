import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../Fetch/fetchVideo';
import VideoList from './videoList';

function Video() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos()
      .then(data => setVideos(data))
      .catch(error => console.error('Error setting videos:', error));
  }, []);

  return <VideoList videos={videos} />;
}

export default Video;
