import { createAction, handleActions } from 'redux-actions';
import { GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE } from 'store/types';

// Action creators
export const getMoviesRequest = createAction(GET_MOVIES_REQUEST);
export const getMoviesSuccess = createAction(GET_MOVIES_SUCCESS);
export const getMoviesFailure = createAction(GET_MOVIES_FAILURE);

// Reducer

const defaultState = {
  data: [],
  loading: false,
  success: false,
  errors: false,
};

export default handleActions(
  {
    [getMoviesRequest]: (state) => ({
      ...state,
      loading: true,
      success: false,
      errors: false,
    }),
    [getMoviesSuccess]: (state, action) => ({
      ...state,
      data: action.payload,
      loading: false,
      success: true,
      errors: false,
    }),
    [getMoviesFailure]: (state) => ({
      ...state,
      loading: false,
      success: false,
      errors: true,
    }),
  },
  defaultState,
);

//  Selectors
export const showMovies = (state) => state.movies.data;
export const showMoviesByCategory = (state, props) =>
  state.movies.data?.filter(({ genre_ids }) => genre_ids.includes(props.match.params.category));
export const showMovieById = (state, props) =>
  state.movies.data?.filter((movie) => movie.id === +props.match.params.id);
