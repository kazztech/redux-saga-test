import { Reducer } from "redux";

import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_FAILURE,
} from "../constance";
import { User } from "../firestore";

export type State = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  users: User[];
};

const initializeState: State = {
  isLoading: true,
  isError: false,
  errorMessage: "",
  users: [],
};

export const usersReducer: Reducer<State> = (
  state = initializeState,
  action
) => {
  switch (action.type) {
    // FETCH
    case FETCH_USERS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        isError: false,
        errorMessage: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "ユーザーの取得に失敗しました",
      };
    // CREATE
    case CREATE_USER:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        isLoading: false,
        isError: false,
        errorMessage: "",
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "ユーザーの作成に失敗しました",
      };
    default: {
      return state;
    }
  }
};
