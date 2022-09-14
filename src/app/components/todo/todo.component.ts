import {Component, OnInit} from "@angular/core";
import {Todo} from "../../models/todo.model";
import {Store} from "@ngrx/store";
import {addTodo, loadTodos, markTodo, removeTodo} from "../../store/todo/todo.actions";
import {Observable, of, switchMap} from "rxjs";
import {selectAllTodos, selectTodosByUserId} from "../../store/todo/todo.selectors";
import {AppState} from "../../store/app.state";
import {FormControl, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {selectCurrentUser} from "../../store/user/user.selectors";
import {userLogOut, userNavigate} from "../../store/user/user.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  readonly displayedColumns = ['content', 'mark', 'remove'];

  todoControl: FormControl<string | null> = new FormControl<string>('', [Validators.required]);
  user$: Observable<User | null> = this.store.select(selectCurrentUser);
  todos$: Observable<Todo[]> = this.user$.pipe(
    switchMap((user: User | null) => {
      if (user) {
        return this.store.select(selectTodosByUserId(user.id))
      }
      return of([]);
    })
  )

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    this.store.dispatch(userNavigate());
  }

  addTodo(): void {
    if (!this.todoControl.invalid) {
      this.store.dispatch(addTodo({content: this.todoControl.value!, userId: this.router.url.substring(1)}));
    }
  }

  markTodo(todo: Todo): void {
    this.store.dispatch(markTodo({id: todo.id}));
  }

  removeTodo(todo: Todo): void {
    this.store.dispatch(removeTodo({id: todo.id}));
  }

  logout(): void {
    this.store.dispatch(userLogOut());
    this.store.dispatch(userNavigate());
  }
}
