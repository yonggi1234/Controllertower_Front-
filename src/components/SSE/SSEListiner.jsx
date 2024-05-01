// SSEListener.jsx
import React, { useState, useEffect } from 'react';

const SSEListener = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('https://gamst.omoknooni.link/video/10/stream/');

    eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        setData(newData);
      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {data && (
        <div>
          <p>ID: {data.id}</p>
          <p>Video ID: {data.video_id}</p>
          {/* 이하 추가적인 데이터 표시 */}
        </div>
      )}
    </div>
  );
};

export default SSEListener;
