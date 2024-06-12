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

    console.log(data?.data?.tracks?.hits)

    const {activeSong, isPlaying} = useSelector((state) => state.player);

    
  // const handlePauseClick = () => {

  //   dispatch(playPause(false));
    
  // };


  // const handlePlayClick = () => {
  //   dispatch(setActiveSong({ song, data, index }));
  //   dispatch(playPause(true));
  // };


    if(isFetching) {
        return <Loader title="Loading songs around you..." />
    }

    if(error) return <Error />;

  return (
    <div className='flex flex-col'>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
          {data?.data?.tracks?.hits?.map((song, index) => {

            const imageUrl = song?.images?.default?.replace('{w}', '250').replace('{h}', '250') || 'defaultImageUrl';

            return (
                <div className={`flex flex-col w-[250px] p-4 bg-[#191624] backdrop-blur-sm animate-slideup rounded-lg`}>
      
                <div className='relative group w-full h-56'>
          
                  <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 flex group-hover:flex`}>
          
                    <PlayPause
                    song={song}
                    // handlePause={handlePauseClick}
                    // handlePlay={handlePlayClick()}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    />
          
                  </div>
          
                  <img className='w-full h-full rounded-md' alt={song?.alias} src={imageUrl} />
          
                </div>
          
                <div className='mt-4 flex flex-col'>
                  <p className='font-semibold text-lg text-white truncate'> 
                  <Link
                to={`/songs/${song?.attributes?.name}`}
              >
                {song?.heading?.title}
              </Link>
                  </p>
                  <p className='text-sm truncate text-gray-300 mt-1'>
                    <Link to={song?.artistName ? `/artists/${song?.heading?.subtitle}` : '/top-artists' }>
                      {song?.heading?.subtitle}
                    </Link>
                  </p>
                </div>
          
              </div>
          )})}
        </div>
    </div>
  )
}

export default Search