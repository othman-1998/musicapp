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
            getTopCharts: builder.query({query: () => '/charts/get-top-songs-in-world'}),
            getSongDetails: builder.query({ query: ({ name }) => `/search?term=${name}&limit=1` }),
            getSongDetailss: builder.query({ query: ({ key }) => `/songs/get_details?id=${key}` })
        })
    });


    export const {
        useGetTopChartsQuery,
        useGetSongDetailsQuery,
        useGetSongDetailssQuery
    } = shazamCoreApi;