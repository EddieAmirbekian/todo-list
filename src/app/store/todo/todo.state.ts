import {Todo} from "../../models/todo.model";
import {Status} from "../../models/status.model";

export interface TodoState {
  todos: Todo[];
  error: string | null;
  status: Status;
}
