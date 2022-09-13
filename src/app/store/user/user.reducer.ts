import {createReducer, on} from "@ngrx/store";
import {UserState} from "./user.state";
import {
  userLogOut,
  userSignIn,
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
  on(userSignInSuccess, (state, {id}) => ({...state, currentUser: state.users.find((user) => user.id === id) || null})),
  on(userSignInFailure, (state, {error}) => ({...state, error})),
  on(userSignUpSuccess, (state, {id}) => ({...state, currentUser: state.users.find((user) => user.id === id) || null})),
  on(userSignUpFailure, (state, {error}) => ({...state, error})),
  on(userLogOut, (state) => ({...state, currentUser: null}))
);
