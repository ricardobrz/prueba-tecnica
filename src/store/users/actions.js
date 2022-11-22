import * as types from "./types";

export function usersListInit(getFollowers) {
  return {
    type: types.USERS_LIST_INIT,
    getFollowers,
  };
}

export function usersDetailInit(query) {
  return {
    type: types.USERS_DETAIL_INIT,
    payload: {
      query,
    },
  };
}

export function usersSearchInit(query) {
  return {
    type: types.USERS_SEARCH_INIT,
    query,
  };
}
