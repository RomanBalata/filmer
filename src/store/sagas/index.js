import { all } from 'redux-saga/effects';
import movies from 'store/sagas/movies';

export default function* rootSaga() {
  yield all([movies()]);
}
