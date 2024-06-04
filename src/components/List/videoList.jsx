import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import ListPopup from './ListPopup';

Modal.setAppElement('#root');

const FetchWarnings = ({ setWarnings }) => {
  useEffect(() => {
    const warningURLs = Array.from({ length: 6 }, (_, i) => `https://gamst.omoknooni.link/video/${i + 1}/risk/`);

    Promise.all(
      warningURLs.map(url =>
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data && data.results) {
              const fetchedData = data.results.map(result => ({
                id: parseInt(url.match(/\/video\/(\d+)\/risk/)[1]),
                url: result.clip_url,
                title: `Video ${parseInt(url.match(/\/video\/(\d+)\/risk/)[1])}`,
                created_at: result.created_at,
                type: 'Video'
              }));
              return fetchedData;
            } else {
              console.error('Invalid video data:', data);
              return [];
            }
          })
          .catch(error => {
            console.error('Error fetching video data:', error);
            return [];
          })
      )
    ).then(warningsData => {
      const mergedWarnings = warningsData.flat();
      setWarnings(prevWarnings => {
        const uniqueWarnings = mergedWarnings.filter(newWarning => !prevWarnings.some(existingWarning => newWarning.id === existingWarning.id));
        return [...prevWarnings, ...uniqueWarnings];
      });
    });
  }, [setWarnings]);

  return null;
};

const SSEWarnings = ({ setWarnings }) => {
  useEffect(() => {
    const eventSource = new EventSource('https://gamst.omoknooni.link/camera/stream/');
    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      const newCamera = {
        id: 0, // Set camera id to 0
        video_uid: eventData.video_uid,
        url: eventData.section_video_url,
        start_time: eventData.start_time, // Store start time
        end_time: eventData.end_time, // Store end time
        created_at: eventData.created_at,
        type: 'Camera'
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
  }, [setWarnings]);

  return null;
};

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const sortVideos = (option) => {
    if (option === 'id') {
      return [...videos].sort((a, b) => b.id - a.id);
    } else if (option === 'date') {
      return [...videos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      return [...videos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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

  const calculateVideoLength = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const difference = end.getTime() - start.getTime();
    return Math.floor(difference / 1000); // Convert milliseconds to seconds
  };

  const filterVideosById = () => {
    if (!selectedId) return videos;
    return videos.filter(video => video.id === parseInt(selectedId));
  };

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleSortOptionChange = (option) => {
    if (sortOption !== option) {
      setSortOption(option);
    } else {
      setSortOption(null);
    }
  };

  const sortedVideos = sortVideos(sortOption);

  return (
    <div className='list-container'>
      <FetchWarnings setWarnings={setVideos} />
      <SSEWarnings setWarnings={setVideos} />

      <div className="select-container">
        <div className="select">
          <div className="dropdown">
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              <option value="">모든 ID</option>
              {videos.map(video => (
                <option key={video.id} value={video.id}>{video.id}</option>
              ))}
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
              <tr key={video.id}>
                <td data-th="Supplier Code">{video.id}</td>
                <td data-th="Supplier Name">발생</td>
                <td data-th="Invoice Number">{video.type === 'Camera' ? 'Camera' : video.title}</td>
                <td data-th="Invoice Date">{formatDate(video.created_at)}</td>
                <td data-th="Due Date">{video.type === 'Camera' ? calculateVideoLength(video.start_time, video.end_time)+'초' : '3'}</td>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '600px',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
          }
        }}
        overlayClassName="custom-modal-overlay"
        closeTimeoutMS={200}
        shouldCloseOnOverlayClick={true}
      >
        {selectedVideo && (
          <ListPopup videoUrl={selectedVideo.url} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
}

export default VideoList;
