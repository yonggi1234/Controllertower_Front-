import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const SSEListener = ({ videos }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("https://gamst.omoknooni.link/video/10/stream/");

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      const { id, video_id, start_frame, end_frame, created_at } = eventData;
      const datetime = created_at.split(/[- :]/).map((item) => parseInt(item));

      // 비디오 ID와 일치하는 비디오 찾기
      const video = videos.find(video => video.id === video_id);
      if (video) {
        // 비디오가 존재하면 해당 URL을 사용하여 비디오를 재생
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

      // 새 이벤트를 상태에 추가
      setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    return () => {
      eventSource.close();
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
      {/* 비디오 목록 확인 */}
      {videos.map(video => (
        <div key={video.id}>
          <p>ID: {video.id}</p>
          <p>URL: {video.url}</p>
        </div>
      ))}
      
      {/* 이벤트 출력 및 비디오 재생 */}
      {events.map((event, index) => {
        // 이벤트의 video_id와 비디오 목록의 id를 비교하여 일치하는 경우 해당 비디오의 URL로 비디오 재생
        const matchedVideo = videos.find(video => video.id === event.video_id);
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
