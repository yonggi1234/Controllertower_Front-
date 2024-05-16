import React, { useState, useEffect } from 'react';
import { fetchVideos } from '../Fetch/fetchVideo';
import '../../style/nav.css';

import SSEListener from './SSEListiner';
import Nav from '../Nav/nav';

function SSEVideo() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos()
      .then(data => setVideos(data))
      .catch(error => console.error('Error setting videos:', error));
  }, []);

  return (
    <div className='cont'>
      {/* <Nav videos={videos} />  */}
      {/* <SSEListener videos={videos} />  */}
    </div>
  );
}

export default SSEVideo;
