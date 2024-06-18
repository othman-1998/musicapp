import React from 'react'
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard } from '../components';
import { useSelector } from 'react-redux';

const TopCharts = () => {

    const {data, isFetching, error} = useGetTopChartsQuery();

    const topCharts = data?.data?.slice(0,10);

    const {activeSong, isPlaying} = useSelector((state) => state.player);


    if(isFetching) {
        return <Loader title="Loading songs around you..." />
    }

    if(error) return <Error />;

  return (
    <div className='flex flex-col'>
        <div className=' w-full'>
          <h2 className='font-bold text-3xl text-white text-left mb-10'>
              Discover Top Charts In The World
          </h2>
        </div>

        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {topCharts?.map((song, index) => (
            <SongCard 
              key={index} 
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              index={index} 
            //   handlePauseClick={handlePauseClick}
            //   handlePlayClick={() => handlePlayClick(song, index)}
            />
          ))}
        </div>
    </div>
  )
}

export default TopCharts