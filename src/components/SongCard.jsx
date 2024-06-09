import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

export default function SongCard({song, index, activeSong, isPlaying, data}) {

  const dispatch = useDispatch();

  const imageUrl = song.attributes?.artwork?.url?.replace('{w}', '250').replace('{h}', '250') || 'defaultImageUrl';

  const Song = song?.attributes;

  const isActive = activeSong?.attributes?.name === Song?.name;


  const handlePauseClick = () => {

    dispatch(playPause(false));
    
  };


  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };
  


  return (

    <div className={`flex flex-col w-[250px] p-4 bg-[#191624] backdrop-blur-sm animate-slideup rounded-lg cursor-pointer ${isActive ? 'bg-opacity-100' : 'bg-opacity-40'} `}>
      
      <div className='relative group w-full h-56'>

        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.attributes?.name === song?.name ? 'flex bg-opacity-70 bg-red' : 'hidden'} `}>

          <PlayPause
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          isPlaying={isPlaying}
          activeSong={activeSong}
          />

        </div>

        <img className='w-full h-full rounded-md' alt={Song?.albumName} src={imageUrl} />

      </div>

      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate'> 
        <Link
      to={`/songs/${song?.attributes?.name}`}
      className={`${
        isActive ? 'text-green-500' : ''
      }`}
    >
      {Song?.name}
    </Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          <Link to={Song?.artistName ? `/artists/${Song?.artistName[0]?.adamid}` : '/top-artists' }>
            {Song?.artistName}
          </Link>
        </p>
      </div>

    </div>

  )
}
