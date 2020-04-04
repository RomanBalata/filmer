import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'services/axiosInterceptors';
import { getMoviesSuccess, getMoviesFailure } from 'store/ducks/movies';
import { GET_MOVIES_REQUEST } from 'store/types';

const getMoviesApi = () => {
  return axios({
    method: 'GET',
  });
};

function* worker() {
  try {
    const {
      data: { results },
    } = yield call(getMoviesApi);
    yield put(getMoviesSuccess(results));
  } catch (errors) {
    yield put(getMoviesFailure());
  }
}

export default function* watcher() {
  yield takeLatest(GET_MOVIES_REQUEST, worker);
}
