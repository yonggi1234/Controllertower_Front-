import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const SSEListener = ({ videos }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const videoIds = Array.from({length: 11}, (_, index) => index + 1);
    const eventSources = videoIds.map(id => new EventSource(`https://gamst.omoknooni.link/video/${id}/stream/`));

    eventSources.forEach((eventSource, index) => {
      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        const { id, video_id, start_frame, end_frame, created_at } = eventData;
        const datetime = created_at.split(/[- :]/).map((item) => parseInt(item));

        const video = videos.find(video => video.id === video_id);
        if (video) {
          const videoUrl = video.url;
          console.log('Playing video:', videoUrl);
          playVideo(videoUrl);
        }

        const newEvent = {
          id: id,
          video_id: video_id,
          start_frame: start_frame,
          end_frame: end_frame,
          datetime: datetime
        };

        setEvents(prevEvents => [...prevEvents, newEvent]);
      };
    });

    return () => {
      eventSources.forEach(eventSource => eventSource.close());
    };
  }, [videos]);

  const playVideo = (url) => {
    return (
      <ReactPlayer
        url={url}
        controls
        width='100%'
        height='100%'
      />
    );
  };

  return (
    <div>
      
      {events.map((event, index) => {
        // 이벤트의 video_id와 비디오 목록의 id를 비교하여 일치하는 경우 해당 비디오의 URL로 비디오 재생
        const matchedVideo = videos.find(video => video.id === event.video_id && video.id === 11);
        if (matchedVideo) {
          return (
            <div key={index}>
              <p>Video ID: {event.video_id}</p>
              <p>Start Frame: {event.start_frame}</p>
              {playVideo(matchedVideo.url)}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default SSEListener;
