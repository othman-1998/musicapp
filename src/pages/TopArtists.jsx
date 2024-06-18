import React, {useEffect} from 'react'
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import {Loader} from '../components';
import { ArtistCard } from '../components';

const TopArtists = () => {

    const {data, isFetching, error} = useGetTopChartsQuery();

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    if(isFetching) {
        return <Loader title="Loading Top Artists In The World..." />
    }

    if(error) return <Error />;


  return (
    <div className='flex flex-col'>
        <div className=' w-full'>
            <h2 className='font-bold text-3xl text-white text-left mb-10'>
                Discover Top Artists
            </h2>
        </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {data?.data?.map((track, i) => (
                <ArtistCard 
                key={i}
                track={track}
                />
            ))}
        </div>

    </div>
  )
}

export default TopArtists