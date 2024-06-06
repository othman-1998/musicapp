import React from 'react'
import { Error, SongCard, Loader } from "../components";
import {genres} from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';

export default function Discover() {

  const genreTitle = 'Pop';

  const dispatch = useDispatch();

  // gets the activeSong and isPlaying bool from our redux state manager
  const {activeSong, isPlaying} = useSelector((state) => state.player);  

  const {data, isFetching, error} = useGetTopChartsQuery();

  if(isFetching) return <Loader title="Music is loading..." />

  if(error) return <Error title="failed..." />

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
            {genres && genres.map((genre, index) => <option key={index} value={genre.value}>{genre.title}</option>)}
          </select>
          
        </div>

        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
          {data.data.map((song, index) => (
            <SongCard
            key={index}
            song={song}
            index={index}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
            />
          ))}
        </div> 

    </div>
  )
}
