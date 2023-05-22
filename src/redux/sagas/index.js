import { all } from 'redux-saga/effects';
import Auth from './Auth';
import Match from './Match';
import Training from './Training'

export default function* rootSaga(getState) {
  yield all([
    Auth(),
	Match(),
	Training(),
  ]);
}
