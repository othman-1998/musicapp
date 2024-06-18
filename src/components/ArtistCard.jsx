import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({track}) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/artists/${track?.attributes?.artistName}`)} className='flex flex-col 2-[250px] bg-[#191624] backdrop-blur-sm animate-slideup rounded-lg p-4 text-white cursor-pointer'>
      <img 
      alt='artist' 
      src={track?.attributes?.artwork?.url.replace('{w}', '250').replace('{h}', '250')} 
      className='w-full h-56 rounded-lg' 
      />
      <p className='mt-4 font-semibold text-xl text-white truncate cursor-pointer'>{track?.attributes?.artistName}</p>
    </div>
  )
}

export default ArtistCard