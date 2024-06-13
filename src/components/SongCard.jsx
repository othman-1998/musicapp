import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

export default function SongCard({song, index, activeSong, isPlaying, data}) {

  console.log(song)

  const dispatch = useDispatch();

  const imageUrl = song.attributes?.artwork?.url?.replace('{w}', '250').replace('{h}', '250') || song?.images?.default?.replace('{w}', '250').replace('{h}', '250') || 'defaultImage';

  const Song = song?.attributes;

  const isActive = activeSong?.id === song?.id; // Use a unique identifier


  const handlePauseClick = () => {

    dispatch(playPause(false));
    
  };


  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };
  


  return (

    <div className={`flex flex-col w-[250px] p-4 bg-[#191624] backdrop-blur-sm animate-slideup rounded-lg cursor-pointer`}>
      
      <div className='relative group w-full h-56'>

        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${isActive ? 'flex bg-opacity-50' : 'hidden'} `}>

          <PlayPause
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          isPlaying={isPlaying}
          activeSong={activeSong}
          />

        </div>

        <img className='w-full h-full rounded-md' alt={Song?.albumName || song?.alias} src={imageUrl} />

      </div>

      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate'> 
        <Link
      to={Song?.artistName ? `/songs/${song?.attributes?.name}` : `/songs/${song?.heading?.title}`}
      className={`${
        isActive ? 'text-green-500' : 'text-white'
      }`}
    >
      {Song?.name || song?.heading?.title}
    </Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          <Link to={Song?.artistName ? `/artists/${Song?.artistName}` : `/artists/${song?.heading?.subtitle}` }>
            {Song?.artistName || song?.heading?.subtitle}
          </Link>
        </p>
      </div>

    </div>

  )
}
