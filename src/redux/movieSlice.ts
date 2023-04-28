import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { MovieListType } from '../types';

const baseURL = 'https://www.omdbapi.com/?apikey=e46f9302';

export type arrayTypeFilter = 'movie' | 'series' | 'episode' | '';
export type queryPlot = 'short' | 'full';

export type initialStateMovieType = {
  listSearchMovies: MovieListType[];
  searchKey: string;
  loadingFetch: boolean;
  errorFetch: boolean;
  typeFilter: arrayTypeFilter;
  totalResults: string;
  movieDetails: MovieListType | {};
};

const initialState: initialStateMovieType = {
  listSearchMovies: [],
  searchKey: '',
  loadingFetch: false,
  errorFetch: false,
  typeFilter: '',
  totalResults: '0',
  movieDetails: {},
};

export type paramsQuery = {
  s?: string | '',
  type?: string,
  plot?: queryPlot[],
};

export const fetchMoviesAPI = createAsyncThunk(
  'movies/fetchMoviesAPI',
  async (queries: any) => {
    try {
      var stringQuery = '';
      Object.keys(queries).forEach((keyQuery:string) =>
        stringQuery += `&${keyQuery}=${queries[keyQuery]}`
      )
      const response = await fetch(`${baseURL}${stringQuery}`);
      const data = await response.json();
      if (data.Error) return {Search: [], totalResults: 0}; 
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
);

export const fetchMoviesDetailsAPI = createAsyncThunk(
  'movies/fetchMoviesDetailsAPI',
  async (id: string) => {
    try {
      const response = await fetch(`${baseURL}&plot=full&&i=${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
);


export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setSearchKey: (state, action: PayloadAction<typeof initialState.searchKey>) => {
      state.searchKey = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<typeof initialState.typeFilter>) => {
      state.typeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesAPI.pending, (state) => {
        state.loadingFetch = true;
        state.errorFetch = false;
      })
      .addCase(fetchMoviesAPI.fulfilled, (state, action: any) => {
        state.loadingFetch = false;
        state.listSearchMovies = [...action.payload.Search];
        state.totalResults = action.payload.totalResults;
        state.errorFetch = false;
      })
      .addCase(fetchMoviesAPI.rejected, (state) => {
        state.loadingFetch = false;
        state.errorFetch = true;
      })
      .addCase(fetchMoviesDetailsAPI.pending, (state) => {
        state.loadingFetch = true;
        state.errorFetch = false;
      })
      .addCase(fetchMoviesDetailsAPI.fulfilled, (state, action: any) => {
        console.log(action.payload)
        state.movieDetails = action.payload;
        state.loadingFetch = false;
        state.errorFetch = false;
      })
      .addCase(fetchMoviesDetailsAPI.rejected, (state) => {
        state.loadingFetch = false;
        state.errorFetch = true;
      });
  },
});

export const { setSearchKey, setTypeFilter } = movieSlice.actions;

export default movieSlice.reducer;
