import React from 'react'
import { Link } from 'react-router-dom'

const DetailsHeader = ({artistId, artistData, songData}) => {

  console.log(songData)

    // Determine the image source based on the availability of artistId and artistData
    const imageSrc = artistId
    ? artistData?.artists[artistId]?.attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
    : songData?.images?.coverart;

  return (
    <div className="relative w-full flex flex-col">
      {songData ? (
        <>
          <div className="w-full bg-gradient-to-t from-transparent to-black sm:h-48 h-28" />

          <div className="absolute inset-0 flex items-center">
            <img alt="art" src={songData?.images?.coverart} className="w-40 rounded-lg" />
          </div>
        </>
      ) : (
        <p className="text-white">Data is loading...</p>
      )}
    </div>

  )
}

export default DetailsHeader