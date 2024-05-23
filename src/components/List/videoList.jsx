import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import ListPopup from './ListPopup';

Modal.setAppElement('#root');

function VideoList({ videos }) {
  const [sortOption, setSortOption] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const sortVideos = (option) => {
    switch (option) {
      case 'id':
        return [...videos].sort((a, b) => a.id - b.id);
      case 'date':
        return [...videos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      default:
        return videos;
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

          <div className="checkbox-group">
            <label>
              <input type="checkbox" checked={sortOption === 'id'} onChange={() => handleSortOptionChange('id')} />
              ID 정렬
            </label>
            <label>
              <input type="checkbox" checked={sortOption === 'date'} onChange={() => handleSortOptionChange('date')} />
              날짜 정렬
            </label>
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
            {filterVideosById().map(video => (
              <tr key={video.id}>
                <td data-th="Supplier Code">{video.id}</td>
                <td data-th="Supplier Name">침입</td>
                <td data-th="Invoice Number">{video.title}</td>
                <td data-th="Invoice Date">{formatDate(video.created_at)}</td> {/* 날짜 포맷 적용 */}
                <td data-th="Due Date">1:39</td>
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
