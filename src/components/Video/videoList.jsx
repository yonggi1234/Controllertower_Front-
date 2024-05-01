// VideoPlayer.js

import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ videos }) {
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
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>{video.created_at}</td>
              <td>
                <ReactPlayer url={video.url} controls={true} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VideoPlayer;
