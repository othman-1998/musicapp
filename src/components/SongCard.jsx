import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

export default function SongCard({song, index }) {

  console.log(song)

  const activeSong = { title: song.attributes.albumName }; // Adjust as needed

  const imageUrl = song.attributes.artwork.url.replace('{w}', '250').replace('{h}', '250'); // Adjust size as needed


  return (

    <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      
      <div className='relative group w-full h-56'>

        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-opacity-70 bg-black' : 'hidden'} `}>

          <PlayPause />

        </div>

        <img className='w-full h-full' alt={song.attributes.albumName} src={imageUrl} />

      </div>

    </div>

  )
}
