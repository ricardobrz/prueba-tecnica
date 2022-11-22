// import moment from "moment";
import { REHYDRATE } from "redux-persist/es/constants";
import * as types from "./types";
import { handleShort } from "../../utils/common";

const initialState = {};

export default function userStore(state = initialState, action) {
  let incoming;
  switch (action.type) {
    case types.USERS_LIST_INIT: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.USERS_LIST_COMPLETE: {
      return {
        ...state,
        isLoading: false,
        users: handleShort(action.payload),
      };
    }
    case types.USERS_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        isLoadingFollowers: false,
      };
    }
    case types.USERS_DETAIL_INIT: {
      return {
        ...state,
        isLoadingUserDetail: true,
      };
    }
    case types.USERS_DETAIL_COMPLETE: {
      return {
        ...state,
        isLoadingUserDetail: false,
        userDetail: action.payload,
      };
    }
    case types.USERS_DETAIL_ERROR: {
      return {
        ...state,
        isLoadingUserDetail: false,
      };
    }
    case types.USERS_FOLLOWERS_INIT: {
      return {
        ...state,
        isLoadingFollowers: true
      };
    }
    case types.USERS_FOLLOWERS_COMPLETE: {
      return {
        ...state,
        followers: action.payload,
        isLoadingFollowers: false
      };
    }
    case REHYDRATE:
      incoming = action.payload ? action.payload.userStore : null;
      if (incoming) {
        return {
          ...incoming,
          isLoading: false,
          isLoadingUserDetail: false,
          isLoadingFollowers: false,
        };
      }
      return state;
    default:
      return state;
  }
}
