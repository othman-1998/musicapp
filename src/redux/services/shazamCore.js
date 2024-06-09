import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

    export const shazamCoreApi = createApi({
        reducerPath: 'shazamCoreApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core7.p.rapidapi.com',
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-Key', 'e391d39944msh7f335387f8cf2acp1480c5jsn66fbc2567166');
                
                return headers;
            },
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({ query: () => '/charts/get-top-songs-in-world' }),
            getSongDetails: builder.query({ query: ({ name }) => `/search?term=${name}&limit=1` }),
            getSongDetailss: builder.query({ query: ({ key }) => `/songs/get_details?id=${key}` }),
            getRelated: builder.query({ query: ({key}) => `/songs/list-recommendations?id=${key}&limit=10` })
        })
    });


    export const {
        useGetTopChartsQuery,
        useGetSongDetailsQuery,
        useGetSongDetailssQuery,
        useGetRelatedQuery
    } = shazamCoreApi;