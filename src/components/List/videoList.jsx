import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import ListPopup from './ListPopup';

Modal.setAppElement('#root');

const useFetchWarnings = () => {
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const warningURLs = Array.from({ length: 6 }, (_, i) => `https://gamst.omoknooni.link/video/${i + 1}/risk/`);

      try {
        const warningsData = await Promise.all(
          warningURLs.map(async url => {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.results) {
              return data.results.map(result => ({
                id: parseInt(url.match(/\/video\/(\d+)\/risk/)[1]),
                url: result.clip_url,
                title: `Video ${parseInt(url.match(/\/video\/(\d+)\/risk/)[1])}`,
                created_at: result.created_at,
                type: 'Video',
                length: result.length, 
              }));
            } else {
              console.error('Invalid video data:', data);
              return [];
            }
          })
        );

        const mergedWarnings = warningsData.flat();
        setWarnings(prevWarnings => {
          const uniqueWarnings = mergedWarnings.filter(newWarning => !prevWarnings.some(existingWarning => newWarning.url === existingWarning.url));
          return [...prevWarnings, ...uniqueWarnings];
        });
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, []);

  return warnings;
};

const useSSEWarnings = () => {
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('https://gamst.omoknooni.link/camera/stream/');
    
    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      const newCamera = {
        id: 0, // Set camera id to 0
        video_uid: eventData.video_uid,
        url: eventData.section_video_url,
        created_at: eventData.created_at,
        type: 'Camera',
        length: eventData.length, 
      };
      setWarnings(prevWarnings => {
        const isDuplicate = prevWarnings.some(warning => warning.video_uid === newCamera.video_uid);
        if (!isDuplicate) {
          return [newCamera, ...prevWarnings];
        }
        return prevWarnings;
      });
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return warnings;
};

function VideoList() {
  const [sortOption, setSortOption] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchWarnings = useFetchWarnings();
  const sseWarnings = useSSEWarnings();

  const warnings = selectedId === 'Camera' ? sseWarnings : fetchWarnings;

  const sortVideos = (option) => {
    if (option === 'id') {
      return [...warnings].sort((a, b) => b.id - a.id);
    } else if (option === 'date') {
      return [...warnings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      return [...warnings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const sortedVideos = sortVideos(sortOption);

  return (
    <div className='list-container'>
      <div className="select-container">
        <div className="select">
          <div className="dropdown">
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              <option value="">Video</option>
              <option value="Camera">Camera</option>
              {/* {[1, 2, 3, 4, 5, 6].map(id => (
                <option key={id} value={id} style={{ display: selectedId === 'Camera' ? 'none' : (warnings.some(video => video.id === id && video.type !== 'Camera') ? 'none' : 'block') }}>{id}</option>
              ))} */}
            </select>
          </div>
        </div>
      </div>

      <div className="container">
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>Id</th>
              <th>이벤트</th>
              <th>비디오</th>
              <th>발생 시간</th>
              <th>영상 길이</th>
              <th>이미지</th>
            </tr>
            {sortedVideos.map(video => (
              <tr key={video.url}>
                <td data-th="Supplier Code">{video.id}</td>
                <td data-th="Supplier Name">발생</td>
                <td data-th="Invoice Number">{video.type === 'Camera' ? 'Camera' : video.title}</td>
                <td data-th="Invoice Date">{formatDate(video.created_at)}</td>
                <td data-th="Due Date">{video.length + '초'}</td>
                <td data-th="Net Amount">
                  <div onClick={() => openModal(video)} style={{ cursor: 'pointer' }}>
                    <ReactPlayer url={video.url} controls={true} width={'150px'} height={'100px'} onClick={(e) => e.stopPropagation()} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedVideo && (
        <ListPopup videoUrl={selectedVideo.url} onClose={closeModal} />
      )}
    </div>
  );
}

export default VideoList;
