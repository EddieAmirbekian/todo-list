import {createReducer, on} from "@ngrx/store";
import {UserState} from "./user.state";
import {
  loadUsersSuccess,
  userLogOut,
  userSignInFailure,
  userSignInSuccess,
  userSignUpFailure,
  userSignUpSuccess
} from "./user.actions";

export const userInitialState: UserState = {
  users: [],
  currentUser: null,
  error: null
};

export const userReducer = createReducer(
  userInitialState,
  on(userSignInSuccess, (state, {id}) => ({
    ...state,
    error: null,
    currentUser: state.users.find((user) => user.id === id) || null
  })),
  on(userSignInFailure, (state, {error}) => ({...state, error: error})),
  on(userSignUpSuccess, (state, {id, username, password}) => ({
    ...state,
    error: null,
    users: [...state.users, {id, username, password}],
    currentUser: {id, username, password}
  })),
  on(loadUsersSuccess, (state, {users, currentUser}) => ({...state, users, currentUser})),
  on(userSignUpFailure, (state, {error}) => ({...state, error: error})),
  on(userLogOut, (state) => ({...state, currentUser: null}))
);
