import React from 'react';
import { useGetUserSearchInputQuery } from '../redux/services/shazamCore';
import { Error, Loader } from '../components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PlayPause from '../components/PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useDispatch } from 'react-redux';

const Search = () => {
    const dispatch = useDispatch();

    const { searchTerm } = useParams();

    console.log(searchTerm);

    const { data, isFetching, error } = useGetUserSearchInputQuery({ searchTerm });

    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const songs = data?.data?.tracks?.hits?.map((hit) => hit);


    if (isFetching) {
        return <Loader title="Loading songs around you..." />;
    }

    if (error) return <Error />;

    const handlePauseClick = () => {
      dispatch(playPause(false));
    };

    const handlePlayClick = (song, index) => {
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    };

    return (
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            <div className=' w-full'>
            <h2 className='font-bold text-3xl text-white text-left'>Results for {searchTerm}</h2>
            </div>
            {songs?.map((song, index) => {
                const imageUrl = song?.images?.default?.replace('{w}', '250').replace('{h}', '250') || 'defaultImage';
                
                const isActive = activeSong?.key === song?.key;

                return (
                    <div key={index} className={`flex flex-col w-[250px] p-4 bg-[#191624] backdrop-blur-sm animate-slideup rounded-lg cursor-pointer`}>
                        <div className='relative group w-full h-56'>
                            <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${isActive ? 'flex bg-opacity-50' : 'hidden'}`}>
                                <PlayPause
                                    song={song}
                                    handlePause={handlePauseClick}
                                    handlePlay={() => handlePlayClick(song, index)}
                                    isPlaying={isPlaying}
                                    activeSong={activeSong}
                                />
                            </div>
                            <img className='w-full h-full rounded-md' alt={song?.alias} src={imageUrl} />
                        </div>
                        <div className='mt-4 flex flex-col'>
                            <p className='font-semibold text-lg text-white truncate'>
                                <Link 
                                    to={`/songs/${song?.heading?.title}`} 
                                    className={`${isActive ? 'text-green-500' : 'text-white'}`}>
                                    {song?.heading?.title}
                                </Link>
                            </p>
                            <p className='text-sm truncate text-gray-300 mt-1'>
                                <Link to={`/artists/${song?.heading?.subtitle}`}>
                                    {song?.heading?.subtitle}
                                </Link>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Search;
