import React from 'react'
import SongBar from './SongBar';


const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId
}) => {

  console.log(data?.tracks);

  return (
    <div className='text-white flex flex-col'>
      <h2 className='font-bold text-3xl text-white'>Related songs</h2>

      <div className='mt-6 w-full flex flex-col'>
        {data?.tracks?.map((song, index) => (
          <SongBar 
          key={`${song.key}-${artistId}`}
          song={song}
          index={index}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          />
        ))}
      </div>

    </div>
  )
}

export default RelatedSongs