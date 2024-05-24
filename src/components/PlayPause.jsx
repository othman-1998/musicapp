import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ song, handlePause, handlePlay, isPlaying, activeSong }) => (
  isPlaying && activeSong?.attributes?.albumName === song.attributes.albumName ? (
    <FaPauseCircle
      size={35}
      className='text-gray-300'
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className='text-gray-300'
      onClick={handlePlay}
    />
  )
);

export default PlayPause;
