import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {UserState} from "./user.state";
import {User} from "../../models/user.model";

export const selectUsers = (state: AppState) => state.users;
export const selectAllUsers = createSelector(
  selectUsers,
  (state: UserState) => state.users
);
export const selectCurrentUser = createSelector(
  selectUsers,
  (state: UserState) => state.currentUser
);
export const selectUserError = createSelector(
  selectUsers,
  (state: UserState) => state.error
);
export const selectAllUserInfo = createSelector(
  selectUsers,
  ({users, currentUser}) => ({users, currentUser})
);
