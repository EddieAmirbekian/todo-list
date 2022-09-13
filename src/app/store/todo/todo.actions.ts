import {createAction, props} from "@ngrx/store";
import {Todo} from "../../models/todo.model";

export const enum TodoActions {
  LOAD = '[ToDo Component] Load all todos',
  LOAD_SUCCESS = '[ToDo API] Loaded all todos successfully',
  LOAD_FAILURE = '[ToDo API] Loading all todos has failed',
  ADD = '[ToDo Component] Add a todo',
  MARK = '[ToDo Component] Mark todo as done',
  REMOVE = '[ToDo Component] Remove a todo',
}

export const loadTodos = createAction(TodoActions.LOAD);
export const loadTodosSuccess = createAction(TodoActions.LOAD_SUCCESS, props<{todos: Todo[]}>());
export const loadTodosFailure = createAction(TodoActions.LOAD_FAILURE, props<{error: string}>());
export const addTodo = createAction(TodoActions.ADD, props<Pick<Todo, 'content'>>());
export const markTodo = createAction(TodoActions.MARK, props<Pick<Todo, 'id'>>());
export const removeTodo = createAction(TodoActions.REMOVE, props<Pick<Todo, 'id'>>());
