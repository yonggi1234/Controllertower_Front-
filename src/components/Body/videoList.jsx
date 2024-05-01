
import React, { useState } from 'react';
// import Modal from 'react-modal';
import '../../style/videoList.css';
import ReactPlayer from 'react-player';

function VideoList({ videos }) {
  return (
    <div>
        <h1>Responsive Table</h1>
        <div class="container">
          <table class="rwd-table">
            <tbody>
              <tr>
                <th>Id</th>
                <th>비디오</th>
                <th>이벤트</th>
                <th>발생 시간</th>
                <th>영상 길이</th>
                <th>이미지</th>
              </tr>
              {videos.map(video => (
              <tr key={video.id}>
                <td data-th="Supplier Code">
                  {video.id}
                </td>
                <td data-th="Supplier Name">
                침입
                </td>
                <td data-th="Invoice Number">
                {video.title}
                </td>
                <td data-th="Invoice Date">
                {video.created_at}
                </td>
                <td data-th="Due Date">
                1:39
                </td>
                <td data-th="Net Amount">
                <ReactPlayer url={video.url} controls={true} width={'150px'} height={'100px'}/>
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
