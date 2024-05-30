import React, { useState, useEffect } from 'react';
import VideoList from './videoList';

import '../../style/videoList.css';

function Video() {
  

  return (
    <div  className='table-container'>
      <VideoList/>
    </div>
  );
}

export default Video;