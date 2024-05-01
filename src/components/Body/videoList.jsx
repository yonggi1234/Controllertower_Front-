import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import '../../style/videoList.css';

function VideoList({ videos }) {
  // 정렬 옵션 상태
  const [sortOption, setSortOption] = useState(null); // null은 기본 정렬을 의미
  // 선택된 ID 상태
  const [selectedId, setSelectedId] = useState('');

  // 정렬 함수
  const sortVideos = () => {
    switch (sortOption) {
      case 'id':
        return [...videos].sort((a, b) => a.id - b.id); // id 오름차순 정렬
      case 'date':
        return [...videos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // 날짜 최신별 정렬
      default:
        return videos; // 기본 정렬
    }
  };

  // 선택된 ID로 필터링하여 비디오 반환
  const filterVideosById = () => {
    if (!selectedId) return videos; // 선택된 ID가 없으면 모든 비디오 반환
    return videos.filter(video => video.id === parseInt(selectedId)); // 선택된 ID와 비디오 ID 비교
  };

  return (
    <div>
      
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
            <input type="checkbox" checked={sortOption === 'id'} onChange={() => setSortOption(sortOption === 'id' ? null : 'id')} />
            ID 정렬
          </label>
          <label>
            <input type="checkbox" checked={sortOption === 'date'} onChange={() => setSortOption(sortOption === 'date' ? null : 'date')} />
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
                <td data-th="Invoice Date">{video.created_at}</td>
                <td data-th="Due Date">1:39</td>
                <td data-th="Net Amount">
                  <ReactPlayer url={video.url} controls={true} width={'150px'} height={'100px'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VideoList;
