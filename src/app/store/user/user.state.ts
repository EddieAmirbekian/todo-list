import {User} from "../../models/user.model";

export interface UserState {
  users: User[];
  currentUser: User | null;
  error: string | null;
}
