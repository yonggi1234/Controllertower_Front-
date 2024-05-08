import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../Fetch/fetchVideo';
import SSEListener from './SSEListiner'; // 오타 수정: SSEListiner -> SSEListener

function SSEVideo() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos()
      .then(data => setVideos(data))
      .catch(error => console.error('Error setting videos:', error));
  }, []);

  return (
    <div style={{backgroundColor:'white'}}>
      <SSEListener videos={videos} /> 
    </div>
  );
}

export default SSEVideo;
