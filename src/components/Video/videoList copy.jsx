import React, { useState } from 'react';
import Modal from 'react-modal';

function VideoList({ videos }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  const openModal = (url) => {
    setSelectedVideoUrl(url);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setSelectedVideoUrl('');
    setModalIsOpen(false);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created At</th>
            <th>Video</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => (
            <tr key={video.id} onClick={() => openModal(video.url)}>
              <td>{video.title}</td>
              <td>{video.created_at}</td>
              <td>
                <video controls width="320" height="240">
                  <source src={video.url} type="video/mp4" />
                </video>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <button onClick={closeModal}>Close</button>
        <video controls autoPlay width="640" height="480">
          <source src={selectedVideoUrl} type="video/mp4" />
        </video>
      </Modal>
    </div>
  );
}


export default VideoList;
