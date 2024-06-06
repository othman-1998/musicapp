import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import {DetailsHeader, Error, Loader, RelatedSongs} from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';

const SongDetails = () => {

    const dispatch = useDispatch();
    const {songid} =  useParams();
    const {activeSong, isPlaying} = useSelector((state) => state.player);


    const {
        attributes: {
          albumName,
          artistName,
          artwork,
          audioLocale,
          audioTraits,
          releaseDate,
          url,
          hasLyrics,
          genreNames,
          durationInMillis,
          name,
          previews
        },
        id,
        relationships,
        type
      } = activeSong;

    console.log(activeSong)

  return (
    <div className='flex flex-col'>
        {/* <DetailsHeader 
        artistId={artistId}
        songData={songData}
        /> */}


        <div className='mb-10'>

            <h2 className='text-white text-3xl font-bold'>
                Lyrics
            </h2>

            <div className='mt-5'>
                Song details data...
                <br></br><br></br>
                <p>{albumName}</p>
                <p>{artistName}</p>
                <p>{hasLyrics}</p>
                <p>{name}</p>
                <p>{durationInMillis}</p>
            </div>
        </div>

    </div>
  )
}

export default SongDetails