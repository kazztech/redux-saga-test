import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from "../constants";
import { User } from "../firestore";

// FETCH
export function fetchUsers() {
  return {
    type: FETCH_USERS,
  };
}

export function fetchUsersSuccess(users: User[]) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
}

export function fetchUsersFeilure() {
  return {
    type: FETCH_USERS_FAILURE,
  };
}

// CREATE
export function createUser(user: User) {
  return {
    type: CREATE_USER,
    payload: user,
  };
}

export function createUserSuccess(user: User) {
  return {
    type: CREATE_USER_SUCCESS,
    payload: user,
  };
}

export function createUserFeilure() {
  return {
    type: CREATE_USER_FAILURE,
  };
}
