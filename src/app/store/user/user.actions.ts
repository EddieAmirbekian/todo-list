import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user.model";
import {UserState} from "./user.state";

export const enum UserActions {
  LOAD_USERS = '[User API] Load users',
  LOAD_USERS_SUCCESS = '[User API] Loaded users successfully',
  LOAD_USERS_FAILURE = '[User API] Loading users has failed',
  SIGN_IN = '[User] Sign in',
  SIGN_IN_SUCCESS = '[User] Sign in success',
  SIGN_IN_FAILURE = '[User] Sign in failure',
  SIGN_UP = '[User] Sign up',
  SIGN_UP_SUCCESS = '[User] Sign up success',
  SIGN_UP_FAILURE = '[User] Sign up failure',
  LOG_OUT = '[User] Log out',
}

export const loadUsers = createAction(UserActions.LOAD_USERS);
export const loadUsersSuccess = createAction(UserActions.LOAD_USERS_SUCCESS, props<Pick<UserState, 'users' | 'currentUser'>>());
export const loadUsersFailure = createAction(UserActions.LOAD_USERS_FAILURE, props<{error: string}>());

export const userSignIn = createAction(UserActions.SIGN_IN, props<Pick<User, 'username' | 'password'>>());
export const userSignInSuccess = createAction(UserActions.SIGN_IN_SUCCESS, props<Pick<User, 'id'>>());
export const userSignInFailure = createAction(UserActions.SIGN_IN_FAILURE, props<{error: string}>());

export const userSignUp = createAction(UserActions.SIGN_UP, props<Pick<User, 'username' | 'password'>>());
export const userSignUpSuccess = createAction(UserActions.SIGN_UP_SUCCESS, props<Pick<User, 'id'>>());
export const userSignUpFailure = createAction(UserActions.SIGN_UP_FAILURE, props<{error: string}>());

export const userLogOut = createAction(UserActions.LOG_OUT);
