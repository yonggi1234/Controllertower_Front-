import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const SSEListener = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("https://gamst.omoknooni.link/camera/stream/");

    eventSource.onmessage = async (event) => {
      const eventData = JSON.parse(event.data);
      
      // URL 출력
      console.log('Received video URL:', eventData.section_video_url); 
      await downloadAndPlayVideo(eventData.section_video_url);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const downloadAndPlayVideo = async (videoUrl) => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setEvents(prevEvents => [...prevEvents, url]);
    } catch (error) {
      console.error('Error downloading or playing video:', error);
    }
  };

  return (
    <div className="content">
      <div className="screen">
        {events.map((videoUrl, index) => (
          <ReactPlayer
            key={index}
            url={videoUrl}
            controls={true}
            width="100%"
            height="auto"
            backgroundColor={'black'}
            className="screenImage"
          />
        ))}
      </div>
    </div>
  );
};

export default SSEListener;
