import React from 'react';
import Todo from './components/List/Todo';
import ReactPlayer from 'react-player';
import Video from './components/List/Video';

import Videoinfo from './video/video.json';

const App = () => {
  const video = Videoinfo.slides;
  return (
    <div>
      <Video data={video}/>
    </div>
  );
};

export default App;