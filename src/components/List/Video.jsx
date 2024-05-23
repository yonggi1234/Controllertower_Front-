import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../Fetch/fetchVideo';
import VideoList from './videoList';

import '../../style/videoList.css';

function Video() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos()
      .then(data => setVideos(data))
      .catch(error => console.error('Error setting videos:', error));
  }, []);

  return (
    <div  className='table-container'>
      <VideoList videos={videos} />
    </div>
  );
}

export default Video;