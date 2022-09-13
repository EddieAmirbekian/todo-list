import {TodoState} from "./todo.state";
import {createReducer, on} from "@ngrx/store";
import {addTodo, loadTodos, loadTodosFailure, loadTodosSuccess, removeTodo} from "./todo.actions";
import {v4 as uuid} from "uuid";

export const initialState: TodoState = {
  todos: [],
  error: null,
  status: 'pending'
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, {content}) => ({
    ...state,
    todos: [...state.todos, {id: uuid(), content}]
  })),
  on(removeTodo, (state, {id}) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id === id)
  })),
  on(loadTodos, (state) => ({...state, status: 'loading'})),
  on(loadTodosSuccess, (state, {todos}) => ({...state, todos})),
  on(loadTodosFailure, (state, {error}) => ({...state, error})),
);
