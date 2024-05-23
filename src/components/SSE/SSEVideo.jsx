import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../Fetch/fetchVideo';
import SSEListener from './SSEListiner';
import ST from './SSETest';
import '../../style/nav.css';


function SSEVideo() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos()
      .then(data => setVideos(data))
      .catch(error => console.error('Error setting videos:', error));
  }, []);

  return (
    <div className='cont'>
      <SSEListener videos={videos} /> 
      {/* <ST videos={videos} />  */}
    </div>
  );
}

export default SSEVideo;
