import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {addTodo, loadTodos, loadTodosFailure, loadTodosSuccess, markTodo, removeTodo} from "./todo.actions";
import {catchError, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {Todo} from "../../models/todo.model";
import {TodoService} from "../../services/todo.service";
import {selectAllTodos} from "./todo.selectors";
import {userLogOut, userSignInSuccess, userSignUpSuccess} from "../user/user.actions";

@Injectable()
export class TodoEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly todoService: TodoService,
  ) { }

  loadTodos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadTodos),
        switchMap(() => from(this.todoService.getTodos())
          .pipe(
            map((todos: Todo[]) => loadTodosSuccess({todos})),
            catchError((error) => of(loadTodosFailure({error})))
          )
        )
      )
  );

  saveTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo, removeTodo, markTodo),
      withLatestFrom(this.store.select(selectAllTodos)),
      switchMap(([action, todos]) => {
        this.todoService.saveTodos(todos);
        return of(true);
      })
    ),
    {dispatch: false}
  );
}
