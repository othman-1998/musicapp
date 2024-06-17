import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => {

  const imageUrl = activeSong.attributes?.artwork?.url?.replace('{w}', '250').replace('{h}', '250')  || activeSong?.images?.default?.replace('{w}', '250').replace('{h}', '250') || 'defaultImageUrl';

  return (
  
  <div className="flex-1 flex items-center justify-center md:justify-start ">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} sm:block h-16 w-16 mr-4`}>
      <img src={imageUrl} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.attributes?.name ? activeSong?.attributes?.name : activeSong?.heading?.title}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.attributes?.artistName ? activeSong?.attributes?.artistName : activeSong?.heading?.subtitle}
      </p>
    </div>
  </div>
)};

export default Track;
