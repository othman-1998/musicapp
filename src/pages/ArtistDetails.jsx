import React from 'react';
import { useParams } from 'react-router-dom'
import { useGetSongDetailsQuery, useGetArtistDetailsQuery, useGetArtistTopSongQuery} from '../redux/services/shazamCore';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from '../components/PlayPause';
import { Link } from 'react-router-dom';

const ArtistDetails = () => {

  // giver os navnet på url parameteren, som er sat til og være name
  const {name} =  useParams();
  console.log(name)

  const {data: songData, isFetching: isFetchingSongData } = useGetSongDetailsQuery({name});

  const adam_id = songData?.data?.artist?.hits[0]?.artist?.adam_id;

  const {data: artistDetailsState, isFetching: isFetchingArtistDetails } = useGetArtistDetailsQuery({adam_id});
  const hasArtistDetails = artistDetailsState?.data?.length > 0;

  console.log(hasArtistDetails && artistDetailsState?.data[0]?.relationships?.albums)


  const imageSrc = hasArtistDetails
    ? artistDetailsState.data[0]?.attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
    : songData?.images?.coverart;

  const {data: artistTopSongs, isFetching: isFetchingArtistTopSongs } = useGetArtistTopSongQuery({adam_id});

  // const albumName = artistTopSongs?.data[0]?.attributes?.albumName;
  // const artistName = artistTopSongs?.data[0]?.attributes?.artistName;
  // const url = artistTopSongs?.data[0]?.attributes?.artwork?.url;
  // const durationInMillis = artistTopSongs?.data[0]?.attributes?.durationInMillis;
  // const genre = artistTopSongs?.data[0]?.attributes?.genreNames[0];
  // const genreSecond = artistTopSongs?.data[0]?.attributes?.genreNames[1];
  // const songName = artistTopSongs?.data[0]?.attributes?.name;
  // const releaseDate = artistTopSongs?.data[0]?.attributes?.releaseDate;

  console.log(artistTopSongs?.data)



  const {activeSong, isPlaying} = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, artistTopSongs: data, index }));
    dispatch(playPause(true));
  };


  if (isFetchingSongData || isFetchingArtistDetails || isFetchingArtistTopSongs) {
    return <div>Loading...</div>;
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
    {artistTopSongs?.data?.map((song, index) => (
      <>
          <div className={`w-full flex flex-row items-center hover:bg-[#2e2a31] py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 
      className='font-bold text-base text-white mr-3'> 
        {index + 1}. 
      </h3>
      <div className='flex-1 flex flex-row justify-between items-center'>

        <img 
        src={song?.attributes?.artwork?.url?.replace('{w}', '75').replace('{h}', '75') || 'defaultImageUrl'} 
        alt={song?.attributes?.name} 
        className='w-20 h-20 rounded-lg'
        />

        <div className='flex-1 flex flex-col justify-center mx-3'> 

          <Link to={`/songs/${song?.attributes?.name}`}>
            <p className='text-xl font-bold text-white'>
              {song?.attributes?.name} 
            </p>
          </Link>

          <Link>
            <p className='text-base text-gray-300 mt-1'>
              {song?.attributes?.artistName} 
            </p>
          </Link>

        </div>

      </div>

      <PlayPause 
        isPlaying={isPlaying} 
        activeSong={activeSong} 
        song={song} 
        handlePause={handlePauseClick} 
        handlePlay={handlePlayClick} 
      />
    </div>
      </>
    ))}



    
    </>
  )
}

export default ArtistDetails