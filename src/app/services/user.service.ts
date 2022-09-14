import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {userInitialState} from "../store/user/user.reducer";
import {UserState} from "../store/user/user.state";
import {v4 as uuid} from "uuid";

@Injectable()
export class UserService {
  private readonly storageKey: string = 'userStore';

  getUserState(): Promise<UserState> {
    return Promise.resolve(
      JSON.parse(localStorage.getItem(this.storageKey) || JSON.stringify(userInitialState))
    );
  }

  signIn(user: Pick<User, 'username' | 'password'>): Promise<User> {
    return this.getUserState().then(
      (state: UserState) => {
        const idx = state.users.findIndex((search: User) => search.username === user.username);
        if (idx === -1) {
          return Promise.reject({error: 'Error: User not found'});
        }
        if (state.users[idx].password !== user.password) {
          return Promise.reject({error: 'Error: Wrong password'});
        }
        return Promise.resolve(state.users[idx]);
      }
    );
  }

  signUp(user: Pick<User, 'username' | 'password'>): Promise<User> {
    return this.getUserState().then(
      (state: UserState) => {
        const idx = state.users.findIndex((search: User) => search.username === user.username);
        if (idx === -1) {
          return Promise.resolve({id: `u-${uuid()}`, ...user});
        }
        return Promise.reject({error: 'Error: User already exists'});
      }
    );
  }

  saveUsers(userState: UserState): void {
    localStorage.setItem(this.storageKey, JSON.stringify(userState));
  }
}
