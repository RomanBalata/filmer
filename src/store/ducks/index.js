import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import movies from 'store/ducks/movies';
import focus from 'store/ducks/focus';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    movies,
    focus,
  });
