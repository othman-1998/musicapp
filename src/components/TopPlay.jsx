import React from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode} from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';


const TopChartCard = ({song, index, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => {

  return (
    <div className={`w-full flex flex-row items-center hover:bg-[#2e2a31] py-2 p-4 rounded-lg cursor-pointer mb-2 ${activeSong?.attributes?.name === song.attributes.name ? 'bg-[#2e2a31]' : 'bg-black'}`}>
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

          <Link to={`/artists/${song?.attributes?.artistName}`}>
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
  )
}



const TopPlay = () => {

  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  const {data, isFetching, error} = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topCharts = data?.data?.slice(0,5);

  const topArtist = data?.data?.slice(5, 10);


  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };


  return (
    <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>

      <div className='w-full flex flex-col bg-[#191624] p-4 rounded-lg'>
        
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
          <Link to="/top-charts">
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <div className='mt-4 flex flex-col gap-1'>
          {topCharts?.map((song, index) => (
            <TopChartCard 
              key={index} 
              song={song} 
              index={index} 
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, index)}
            />
          ))}
        </div>

      </div>

      <div className='w-full flex flex-col mt-8 bg-[#191624] p-4 rounded-lg mb-10'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
          <Link to="/top-artists">
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className='mt-4'
        >
          {topArtist?.map((song, index) => (
            <SwiperSlide 
            style={{width: '25%', height: 'auto'}} 
            key={index}
            className='shadow-lg rounded-full animate-sliderright'
            >
              <Link 
              to={`/artists/${song?.attributes?.artistName}`}
              >
                <img 
                  // src={song?.attributes?.artwork?.url} 
                  src={song?.attributes?.artwork?.url?.replace('{w}', '75').replace('{h}', '75') || 'defaultImageUrl'} 
                  alt={song?.attributes?.artistName} 
                  className='rounded-full w-full object-cover' 
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  )
}

export default TopPlay