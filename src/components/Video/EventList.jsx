// EventList.jsx
import React, { useEffect, useState } from 'react';
import { fetchVideos } from '../Fetch/fetchVideo';
import SSEListener from '../SSE/SSEListiner';
import Event from '../Video/Event';

const EventList = () => {
  const [videos, setVideos] = useState([]);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const videosData = await fetchVideos();
      setVideos(videosData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <SSEListener onData={setEventData} />
      <Event videos={videos} eventData={eventData} />
    </div>
  );
};

export default EventList;
