import { Reducer } from "redux";
import { fromJS, List } from "immutable";

import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_FAILURE,
} from "../constants";
import { User } from "../firestore";

export type State = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  users: User[];
};

const initializeState = fromJS({
  isLoading: true,
  isError: false,
  errorMessage: "",
  users: [],
});

// TODO: 型が通せていない
export const usersReducer: Reducer = (state = initializeState, action) => {
  switch (action.type) {
    // FETCH
    case FETCH_USERS: {
      return state.set("isLoading", true);
    }
    case FETCH_USERS_SUCCESS: {
      return state
        .set("users", action.payload)
        .set("isLoading", false)
        .set("isError", false)
        .set("errorMessage", "");
    }
    case FETCH_USERS_FAILURE:
      return state
        .set("isLoading", false)
        .set("isError", true)
        .set("errorMessage", "ユーザーの取得に失敗しました");
    // CREATE
    case CREATE_USER: {
      return state.set("isLoading", true);
    }
    case CREATE_USER_SUCCESS: {
      return state
        .set("users", state.get("users").concat(action.payload))
        .set("isLoading", false)
        .set("isError", false)
        .set("errorMessage", "");
    }
    case CREATE_USER_FAILURE: {
      return state
        .set("isLoading", false)
        .set("isError", true)
        .set("errorMessage", "ユーザーの作成に失敗しました");
    }
    default: {
      return state;
    }
  }
};
