import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';

const SongBar = ({ song, index, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {

  const name = song?.title;

  const {data: songData, isFetching: isFetchingSongData } = useGetSongDetailsQuery(name);

  // console.log(songData)


  return (
  <div onClick={() => console.log(song)} className={`w-full flex flex-row items-center hover:bg-[#2e2a31] ${activeSong?.title === song?.title ? 'bg-[#2e2a31]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={artistId ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        {!artistId ? (
          // <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">
              {song?.title}
            </p>
          // </Link>
        ) : (
          <p className="text-xl font-bold text-white">
            {song?.attributes?.name}
          </p>
        )}
        <Link to={`/artists/${song?.subtitle}`}>
        <p className="text-base text-gray-300 mt-1">
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p>
        </Link>
      </div>
    </div>
    {!artistId
      ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, index)}
        />
      )
      : null}
  </div>
)};

export default SongBar;