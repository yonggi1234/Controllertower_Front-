import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';

function Video({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideoSrc, setSelectedVideoSrc] = useState('');
  const [selectedVideoTitle, setSelectedVideoTitle] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState('');

  const openModal = (src, title, id) => {
    setSelectedVideoSrc(src);
    setSelectedVideoTitle(title);
    setSelectedVideoId(id);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setSelectedVideoSrc('');
    setSelectedVideoTitle('');
    setSelectedVideoId('');
    setModalIsOpen(false);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>썸네일</th>
            <th>영상 제목</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} onClick={() => openModal(item.src, item.title, item.id)}>
              <td><img src={`http://img.youtube.com/vi/${item.src.split('/').pop()}/0.jpg`} alt="Thumbnail" /></td>
              <td>{item.title}</td>
              <td>{item.id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <button onClick={closeModal}>Close</button>
        <h2>{selectedVideoTitle}</h2>
        <p>ID: {selectedVideoId}</p>
        <ReactPlayer url={selectedVideoSrc} controls={true} />
      </Modal>

    </div>
  );
}

export default Video;
