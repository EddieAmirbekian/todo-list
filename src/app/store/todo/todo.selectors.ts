import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {TodoState} from "./todo.state";
import {Todo} from "../../models/todo.model";

export const selectTodos = (state: AppState) => state.todos;
export const selectAllTodos = createSelector(
  selectTodos,
  (state: TodoState) => state.todos
);
export const selectTodosByUserId = (userId: string) => createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter((todo) => todo.userId === userId)
);
