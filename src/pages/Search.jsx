import React from 'react'
import { useGetUserSearchInputQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard } from '../components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PlayPause from '../components/PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useDispatch } from 'react-redux';

const Search = () => {


    const {searchTerm} = useParams();

      const dispatch = useDispatch();


    console.log(searchTerm)

    const {data, isFetching, error} = useGetUserSearchInputQuery({searchTerm});


    const {activeSong, isPlaying} = useSelector((state) => state.player);

    const songs = data?.data?.tracks?.hits?.map((song) => song);

    console.log(songs)

    
    const handlePauseClick = () => {

      dispatch(playPause(false));
      
    };
  
  
    const handlePlayClick = (song, index) => {
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    };


    if(isFetching) {
        return <Loader title="Loading songs around you..." />
    }

    if(error) return <Error />;

  return (
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>

      <h2 className='font-bold text-3xl text-white text-left'>Showing results for {searchTerm}</h2>

      {songs?.map((song, index) => (
        <SongCard
        key={index}
        song={song}
        index={index}
        activeSong={activeSong}
        isPlaying={isPlaying}
        data={data}
        handlePauseClick={handlePauseClick}
        handlePlayClick={() => handlePlayClick(song, index)}
        />
      ))}

  </div>
  )
}

export default Search