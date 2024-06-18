import React from 'react';
import { useParams } from 'react-router-dom'
import { useGetSongDetailsQuery, useGetArtistDetailsQuery, useGetArtistTopSongQuery} from '../redux/services/shazamCore';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from '../components/PlayPause';
import { Link } from 'react-router-dom';
import { SongCard } from '../components';
import {Loader} from '../components';

const ArtistDetails = () => {

  // giver os navnet på url parameteren, som er sat til og være name
  const {name} =  useParams();

  const {data: songData, isFetching: isFetchingSongData } = useGetSongDetailsQuery({name});

  const adam_id = songData?.data?.artist?.hits[0]?.artist?.adam_id;

  const {data: artistDetailsState, isFetching: isFetchingArtistDetails } = useGetArtistDetailsQuery({adam_id});
  const hasArtistDetails = artistDetailsState?.data?.length > 0;

  const imageSrc = hasArtistDetails
    ? artistDetailsState.data[0]?.attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
    : songData?.images?.coverart;

  const {data: artistTopSongs, isFetching: isFetchingArtistTopSongs } = useGetArtistTopSongQuery({adam_id});


  const {activeSong, isPlaying} = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, artistTopSongs: data, index }));
    dispatch(playPause(true));
  };


  if (isFetchingSongData || isFetchingArtistDetails || isFetchingArtistTopSongs) {
    return <Loader />
  }

  if (!hasArtistDetails) {
    return <div>No artist details available</div>;
  }


  return (
    <>
    <div className='relative w-full flex flex-col'>
          <div className="w-full bg-gradient-to-t from-transparent to-black sm:h-48 h-48 rounded-lg" />

          <div className="absolute inset-0 flex items-center">

            <img 
            alt="art" 
            src={imageSrc} 
            className="ml-5 sm:w-49 w-28 sm:h-28 h-28 rounded-full object-contain border shadow-xl shadow-black" />

            <div className='ml-5'>
                <p className='text-base text-white mt-2'>
                  {hasArtistDetails && artistTopSongs?.data[0]?.attributes?.artistName}
                </p>

              <p className='text-base text-gray-400 mt-2'>
                {artistDetailsState?.data[0]?.attributes?.genreNames[0]}
              </p>
              
            </div>

          </div>
          
    </div>

    <h2 className='text-white font-bold text-2xl mb-5'>Top songs</h2>
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
      {artistTopSongs?.data?.map((song, index) => (
              <SongCard 
              key={index} 
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={artistTopSongs}
              index={index} 
            //   handlePauseClick={handlePauseClick}
            //   handlePlayClick={() => handlePlayClick(song, index)}
            />
      ))}
    </div>



    
    </>
  )
}

export default ArtistDetails