import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../../redux/features/playerSlice';
import Track from './Track';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { activeSong, isActive, isPlaying } = useSelector((state) => state.player);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (activeSong?.attributes?.previews?.length > 0) {
      if (audio.src !== activeSong.attributes.previews[0].url) {
        audio.src = activeSong.attributes.previews[0].url;
        audio.load();
      }

      if (isActive && isPlaying) {
        audio.play().catch(error => console.error('Playback error:', error));
      } else {
        audio.pause();
      }
    } else {
      audio.pause();
    }

    const handlePlay = () => dispatch(playPause(true));
    const handlePause = () => dispatch(playPause(false));
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [activeSong, isActive, isPlaying, dispatch]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <div className="relative sm:px-2 px-8 py-2 w-full md:flex items-center justify-between">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <audio
        ref={audioRef}
        controls
        className='w-full md:w-[50%] mt-5 md:mt-0'
      />
    </div>
  );
};

export default MusicPlayer;
