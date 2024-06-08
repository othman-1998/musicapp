import React from 'react'
import { Link } from 'react-router-dom'

const DetailsHeader = ({artistId, artistData, songData}) => {


    // Determine the image source based on the availability of artistId and artistData
    const imageSrc = artistId
    ? artistData?.artists[artistId]?.attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
    : songData?.images?.coverart;

    const artist = artistData?.artists[artistId]?.attributes;

  return (
    <div className="relative w-full flex flex-col">
      {songData ? (
        <>
          <div className="w-full bg-gradient-to-t from-transparent to-black sm:h-48 h-48 rounded-lg" />

          <div className="absolute inset-0 flex items-center">

            <img alt="art" src={songData?.images?.coverart} className="sm:w-49 w-28 sm:h-28 h-28 rounded-full object-contain border-2 shadow-xl shadow-black" />

            <div className='ml-5'>

              <p className='font-bold sm:text-3xl text-xl text-white'>
                {artist ? artist?.name : songData?.subtitle}
              </p>
              {!artistId && (
                <p className='text-base text-gray-400 mt-2'>
                  {songData?.title}
                </p>
              )}

              <p className='text-base text-gray-400 mt-2'>
                {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
              </p>
              
              <p className='text-base text-gray-400 mt-2'>
                {artistId ? artist?.genreNames[0] : songData?.releasedate}
              </p>

            </div>

          </div>
        </>
      ) : (
        <p className="text-white">Data is loading...</p>
      )}

    </div>

  )
}

export default DetailsHeader