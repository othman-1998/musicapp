import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {DetailsHeader, Error, Loader, RelatedSongs} from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';

import { useGetSongDetailsQuery, useGetSongDetailssQuery } from '../redux/services/shazamCore';

const SongDetails = () => {

    const dispatch = useDispatch();

    // giver os navnet på url parameteren, som er sat til og være name
    const {name} =  useParams();
    // console.log(name)

    // får fat i activeSong her 
    const {activeSong, isPlaying} = useSelector((state) => state.player);

    // får fat i songdata som har den key vi skal bruge til at fetch songDetails endpoint
    const {data: songData, isFetching: isFetchingSongData } = useGetSongDetailsQuery({name});

    // const artistTitle = songData?.data?.tracks?.hits[0]?.heading?.subtitle;
    // const songTitle = songData?.data?.tracks?.hits[0]?.heading?.title;

    // key vi skal bruge til at kalde getDetails endpoint
    const key = songData?.data?.tracks?.hits[0].key;

    // får fat i songDetails ved hjælp af key fra andet endpoint kald
    const {data: songDetails, isFetching: isFetchingSongDetails } = useGetSongDetailssQuery({key});


    console.log(songDetails);

    const songTitle = songDetails?.title || '';
    const songArtist = songDetails?.subtitle || '';
    const type = songDetails?.type || '';
    const genre = songDetails?.genres?.primary || '';
    const artistImage = songDetails?.images?.background || '';
    const coverImage = songDetails?.images?.coverart || '';
    const releaseDate = songDetails?.releasedate || '';
    const linkToShazam = songDetails?.url || '';
    const artistId = (Array.isArray(songDetails?.artists) && songDetails.artists.length > 0) ? songDetails.artists[0]?.adamid : '';



  return (
    <div className='flex flex-col'>
        <DetailsHeader 
        // artistId={artistId}
        songData={songDetails}
        isFetchingSongDetails={isFetchingSongDetails}
        />


        <div className='mb-10 mt-10 lg:mt-5'>

            <h2 className='text-white text-3xl font-bold'>
                Lyrics
            </h2>

            <div className="mt-3 text-white">
                <p>No lyrics found...</p>
            </div>
        </div>

    </div>
  )
}

export default SongDetails