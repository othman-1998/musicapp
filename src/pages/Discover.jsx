import React from 'react'
import { Error, SongCard, Loader } from "../components";
import {genres} from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

export default function Discover() {

    // console.log(genres)

    const {data, isFetching, error} = useGetTopChartsQuery();
    console.log(data)

    if(isFetching) return <Loader title="Music is loading..." />

    if(error) return <Error title="failed..." />

    const genreTitle = 'Pop';

  return (
    <div className='flex flex-col'>

        <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>

          <h2 className='font-bold text-3xl text-white text-left'>
            Discover {genreTitle}
          </h2>
          <select
          onChange={() => {}}
          value=""
          className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
          >
            {genres.map((genre, index) => <option key={index} value={genre.value}>{genre.title}</option>)}
          </select>
          
        </div>

        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
          {data.data.map((song, index) => (
            <SongCard
            key={index}
            song={song}
            index={index}
            />
          ))}
        </div> 

    </div>
  )
}
