import {Injectable} from "@angular/core";
import {Todo} from "../models/todo.model";

@Injectable()
export class TodoService {
  getTodos(): Promise<Todo[]> {
    return Promise.resolve(
      JSON.parse(localStorage.getItem('todos') || '[]')
    );
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
