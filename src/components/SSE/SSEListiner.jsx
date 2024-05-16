import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const SSEListener = ({ videos }) => {
  const [events, setEvents] = useState([]);
  const [popupVideoUrl, setPopupVideoUrl] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource("https://gamst.omoknooni.link/video/10/stream/");

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      const { id, video_id, start_frame, end_frame, created_at } = eventData;
      const datetime = created_at.split(/[- :]/).map((item) => parseInt(item));

      const newEvent = {
        id: id,
        video_id: video_id,
        start_frame: start_frame,
        end_frame: end_frame,
        datetime: datetime
      };

      setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // 핍업 창 닫기
  const closePopup = () => {
    setPopupOpen(false);
    setPopupVideoUrl('');
  };

  // 핍업 창 열기 및 비디오 URL 설정
  const openPopup = (url) => {
    setPopupOpen(true);
    setPopupVideoUrl(url);
  };

  return (
    <div>
      {/* 비디오 목록 확인 */}
      {videos.map(video => (
        <div key={video.id}>
          <p>ID: {video.id}</p>
          <p>URL: {video.url}</p>
          {/* 비디오 클릭 시 핍업 열기 */}
          <button onClick={() => openPopup(video.url)}>Play Video</button>
        </div>
      ))}

      {/* 핍업 창 */}
      {popupOpen && (
        <div className="popup">
          <button onClick={closePopup}>Close</button>
          <div>
            {/* 핍업 창 내에서 ReactPlayer를 사용하여 영상 재생 */}
            <ReactPlayer
              url={popupVideoUrl}
              controls
              width='30%'
              height='30%'
            />
          </div>
        </div>
      )}
      
      {/* 이벤트 출력 */}
      {events.map((event, index) => (
        <div key={index}>
          <p>Video ID: {event.video_id}</p>
          <p>Start Frame: {event.start_frame}</p>
          <p>End Frame: {event.end_frame}</p>
        </div>
      ))}
    </div>
  );
};

export default SSEListener;
