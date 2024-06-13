import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
import { useState } from 'react';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#000000]">
        <Searchbar />

        <div className="px-5 md:px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:name" element={<ArtistDetails />} />
              <Route path="/songs/:name" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {(activeSong?.attributes?.name || activeSong.title) && (
        <div className="absolute p-2 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#191624] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
          {/* <audio className='w-1/2' id="audio" src={activeSong?.attributes?.previews[0]?.url} controls autoPlay /> */}
        </div>
      )}
    </div>
  );
};

export default App;
