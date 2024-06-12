import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopSongsAroundYouQuery } from '../redux/services/shazamCore';

const AroundYou = () => {

    const [country, setCountry] = useState();

    const [loading, setLoading] = useState(true);

    const {activeSong, isPlaying} = useSelector((state) => state.player);


    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_1lfcOxYxIeF5e3L24HHUKMhQsiH3H`)
        .then((res) => { 
            console.log(res?.data?.location?.country)
            setCountry(res?.data?.location?.country)
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));

    }, [country])

    const {data, isFetching, error} = useGetTopSongsAroundYouQuery({country});


    console.log(data?.data)




    if(isFetching && loading) {
        return <Loader title="Loading songs around you..." />
    }

    if(error && country) return <Error />;


  return (
    <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
            Around You
            <span> ({country}) </span>
        </h2>

        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {data?.data?.map((song, index) => (
                <SongCard 
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                index={index}
                />
            ))}
        </div>
    </div>
  )
}

export default AroundYou;