import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const SSEListener = () => {
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   const eventSource = new EventSource("https://gamst.omoknooni.link/camera/stream/");

  //   eventSource.onmessage = async (event) => {
  //     const eventData = JSON.parse(event.data);
      
  //     // URL 출력
  //     console.log('Received video URL:', eventData.section_video_url); 
  //     await downloadAndPlayVideo(eventData.section_video_url);
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  // const downloadAndPlayVideo = async (videoUrl) => {
  //   try {
  //     const response = await fetch(videoUrl);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     setEvents(prevEvents => [...prevEvents, url]);
  //   } catch (error) {
  //     console.error('Error downloading or playing video:', error);
  //   }
  // };

  return (
    <div className="content">
      <div className="screen">
        {/* {events.map((videoUrl, index) => ( */}
        <video width="640" height="360" controls>
        <source src="https://omoknooni-gamst-video.s3.amazonaws.com/output_240511221046.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
          {/* <ReactPlayer
            // key={index}
            url={"https://omoknooni-gamst-video.s3.amazonaws.com/output_240511220346.mp4"}
            controls={true}
            width="100%"
            height="auto"
            backgroundColor={'black'}
            className="screenImage"
          /> */}
        {/* ))} */}
      </div>
    </div>
  );
};

export default SSEListener;
