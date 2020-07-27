import { put, takeEvery, call, take } from "redux-saga/effects";
import {
  fetchUsersSuccess,
  fetchUsersFeilure,
  createUser,
  createUserSuccess,
  createUserFeilure,
} from "../actions";
import { db, rsf, User } from "../firestore";
import { FETCH_USERS, CREATE_USER } from "../constance";

export function* fetchUsersSaga() {
  const docs = yield call(rsf.firestore.getCollection, db.collection("users"));
  if (docs && !docs.empty) {
    const users: User[] = docs.docs.map((doc: any) => doc.data());
    yield put(fetchUsersSuccess(users));
  } else {
    yield put(fetchUsersFeilure());
  }
}

export function* createUserSaga(action: ReturnType<typeof createUser>) {
  const res = yield call(rsf.firestore.addDocument, "users", action.payload);
  if (res) {
    yield put(createUserSuccess(action.payload));
  } else {
    yield put(createUserFeilure());
  }
}

export default function* () {
  yield takeEvery(FETCH_USERS, fetchUsersSaga);
  yield takeEvery(CREATE_USER, createUserSaga);
}
