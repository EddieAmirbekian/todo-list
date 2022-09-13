import {TodoState} from "./todo/todo.state";
import {UserState} from "./user/user.state";

export interface AppState {
  todos: TodoState;
  users: UserState;
}
