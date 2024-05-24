import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

export default function SongCard({song, index, activeSong, isPlaying, data}) {

  const dispath = useDispatch();

  const imageUrl = song.attributes.artwork.url.replace('{w}', '250').replace('{h}', '250'); // Adjust size as needed

  const Song = song.attributes;

  const handlePauseClick = () => {

    dispath(playPause(false));
    
  };

  const handlePlayClick = () => {

    dispath(setActiveSong({song, data, index}));
    dispath(playPause(true));

  };


  return (

    <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      
      <div className='relative group w-full h-56'>

        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-opacity-70 bg-black' : 'hidden'} `}>

          <PlayPause
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          isPlaying={isPlaying}
          activeSong={activeSong}
          />

        </div>

        <img className='w-full h-full' alt={Song.albumName} src={imageUrl} />

      </div>

      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate'> 
          <Link to={`/songs/${Song?.key}`}>
            {Song.albumName}
          </Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          <Link to={Song.artistName ? `/artists/${Song?.artistName[0]?.adamid}` : '/top-artists' }>
            {Song.artistName}
          </Link>
        </p>
      </div>

    </div>

  )
}
