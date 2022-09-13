import {TodoState} from "./todo.state";
import {createReducer, on} from "@ngrx/store";
import {addTodo, loadTodos, loadTodosFailure, loadTodosSuccess, markTodo, removeTodo} from "./todo.actions";
import {v4 as uuid} from "uuid";

export const initialState: TodoState = {
  todos: [{id: '1', content: 'Hi', marked: false}],
  error: null,
  status: 'pending'
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, {content}) => ({
    ...state,
    todos: [...state.todos, {id: uuid(), content, marked: false}]
  })),
  on(markTodo, (state, {id}) => ({
    ...state,
    todos: [...state.todos].map((todo) => todo.id === id ? {...todo, marked: !todo.marked} : todo)
  })),
  on(removeTodo, (state, {id}) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id)
  })),
  on(loadTodos, (state) => ({...state, status: 'loading'})),
  on(loadTodosSuccess, (state, {todos}) => ({...state, todos, error: null, status: 'success'})),
  on(loadTodosFailure, (state, {error}) => ({...state, error, status: 'error'})),
);
