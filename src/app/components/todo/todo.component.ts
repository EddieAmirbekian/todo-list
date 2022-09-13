import {Component, OnInit} from "@angular/core";
import {Todo} from "../../models/todo.model";
import {Store} from "@ngrx/store";
import {addTodo, loadTodos, markTodo, removeTodo} from "../../store/todo/todo.actions";
import {Observable} from "rxjs";
import {selectAllTodos} from "../../store/todo/todo.selectors";
import {AppState} from "../../store/app.state";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  readonly displayedColumns = ['content', 'mark', 'remove'];

  todoControl: FormControl<string | null> = new FormControl<string>('', [Validators.required]);
  todos$: Observable<Todo[]> = this.store.select(selectAllTodos);

  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos())
  }

  addTodo(): void {
    if (!this.todoControl.invalid) {
      this.store.dispatch(addTodo({content: this.todoControl.value!}));
    }
  }

  markTodo(todo: Todo): void {
    this.store.dispatch(markTodo({id: todo.id}));
  }

  removeTodo(todo: Todo): void {
    this.store.dispatch(removeTodo({id: todo.id}));
  }
}
