import { put, call, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import API from "../../services/customAxios";
import { handleShort } from "../../utils/common";

export function* usersListInitCall({ getFollowers }) {
  try {
    const result = yield call(API.get, "/users");
    let data = [];
    if (result?.data?.length) {
      data = result.data;
      if (getFollowers) {
        yield put({
          type: types.USERS_FOLLOWERS_INIT,
        });
        let followers = [];
        yield* handleShort(result.data).map(function* ({ login }) {
          const result = yield call(API.get, `users/${login}`);
          followers.push({
            name: result.data.login,
            followers: result.data.followers,
          });
        });
        yield put({
          type: types.USERS_FOLLOWERS_COMPLETE,
          payload: followers,
        });
      }
    }
    yield put({
      type: types.USERS_LIST_COMPLETE,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.USERS_LIST_ERROR,
      payload: error,
    });
  }
}

export function* usersDetailCall({ payload: { query } }) {
  try {
    const result = yield call(API.get, `users/${query}`);
    let userDetail = {};
    if (Object.keys(result.data).length) {
      userDetail = result.data;
    }
    yield put({
      type: types.USERS_DETAIL_COMPLETE,
      payload: userDetail,
    });
  } catch (error) {
    yield put({
      type: types.USERS_DETAIL_ERROR,
      payload: error,
    });
  }
}

export function* usersSearchCall({ query }) {
  try {
    const result = yield call(API.get, `search/users?q=${query}`);
    let data = [];
    if (result?.data?.items?.length) {
      data = result.data.items;
    }
    yield put({
      type: types.USERS_LIST_COMPLETE,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.USERS_DETAIL_ERROR,
      payload: error,
    });
  }
}

export default function* users() {
  yield takeLatest(types.USERS_LIST_INIT, usersListInitCall);
  yield takeLatest(types.USERS_DETAIL_INIT, usersDetailCall);
  yield takeLatest(types.USERS_SEARCH_INIT, usersSearchCall);
}
