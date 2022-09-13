import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {UserService} from "../../services/user.service";
import {
  loadUsers, loadUsersFailure, loadUsersSuccess,
  userSignIn,
  userSignInFailure,
  userSignInSuccess,
  userSignUp,
  userSignUpFailure,
  userSignUpSuccess
} from "./user.actions";
import {catchError, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {User} from "../../models/user.model";
import {UserState} from "./user.state";
import {addTodo, markTodo, removeTodo} from "../todo/todo.actions";
import {selectAllTodos} from "../todo/todo.selectors";
import {selectAllUserInfo} from "./user.selectors";

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly userService: UserService,
  ) { }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() => from(this.userService.getUserState()).pipe(
        map(({users, currentUser}) => loadUsersSuccess({users, currentUser})),
        catchError(({error}) => of(loadUsersFailure({error})))
      ))
    )
  );

  saveTodos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addTodo, markTodo, removeTodo),
        withLatestFrom(this.store.select(selectAllUserInfo)),
        switchMap(([action, info]) => {
          this.userService.saveUsers({...info, error: null});
          return of(true);
        })
      ),
    {dispatch: false}
  )

  userSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignIn),
      switchMap(({username, password}) => from(this.userService.signIn({username, password})).pipe(
        map((user: User) => userSignInSuccess(user)),
        catchError((error: string) => of(userSignInFailure({error})))
      ))
    )
  );

  userSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignUp),
      switchMap(({username, password}) => from(this.userService.signUp({username, password})).pipe(
        map((user: User) => userSignUpSuccess(user)),
        catchError((error: string) => of(userSignUpFailure({error})))
      ))
    )
  );
}
