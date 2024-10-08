import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

    export const shazamCoreApi = createApi({
        reducerPath: 'shazamCoreApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core7.p.rapidapi.com',
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-Key', '85d2813c98mshea0557223226a10p11604bjsn6e1ba0ca869a');
                
                return headers;
            },
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({ query: () => '/charts/get-top-songs-in-world?limit=10' }),
            getSongDetails: builder.query({ query: ({ name }) => `/search?term=${name}&limit=1` }),
            getSongDetailss: builder.query({ query: ({ key }) => `/songs/get_details?id=${key}` }),
            getRelated: builder.query({ query: ({key}) => `/songs/list-recommendations?id=${key}&limit=10` }),
            getArtistDetails: builder.query({ query: ({ adam_id }) => `/artist/get-details?id=${adam_id}` }),
            getArtistTopSong: builder.query({ query: ({ adam_id }) => `/artist/get-top-songs?id=${adam_id}&offset=0` }),
            getTopSongsAroundYou: builder.query({
                query: ({ country }) => `/charts/get-top-songs-in-country?country_code=${country}&limit=10`
              }),
            getTopChartsByGenre: builder.query({ query: (genre) => `/charts/get-top-songs-in_world_by_genre?genre=${genre}&limit=10` }),
            getUserSearchInput: builder.query({ query: ({searchTerm}) => `/search?term=${searchTerm}&limit=10`})
        })
    });


    export const {
        useGetTopChartsQuery,
        useGetSongDetailsQuery,
        useGetSongDetailssQuery,
        useGetRelatedQuery,
        useGetArtistDetailsQuery,
        useGetArtistTopSongQuery,
        useGetTopSongsAroundYouQuery,
        useGetTopChartsByGenreQuery,
        useGetUserSearchInputQuery
    } = shazamCoreApi;