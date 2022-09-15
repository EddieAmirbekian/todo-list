import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {UserService} from "../../services/user.service";
import {
  loadUsers, loadUsersFailure, loadUsersSuccess, userLogOut, userNavigate,
  userSignIn,
  userSignInFailure,
  userSignInSuccess,
  userSignUp,
  userSignUpFailure,
  userSignUpSuccess
} from "./user.actions";
import {catchError, from, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {User} from "../../models/user.model";
import {selectAllUserInfo, selectCurrentUser} from "./user.selectors";
import {Router} from "@angular/router";

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
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

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userNavigate),
      withLatestFrom(this.store.select(selectCurrentUser)),
      tap(([action, currentUser]) => {
        if (currentUser) {
          this.router.navigateByUrl(`/${currentUser.id}`);
        } else {
          this.router.navigateByUrl('/login');
        }
      })
    ),
    {dispatch: false}
  )

  saveUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userSignInSuccess, userSignUpSuccess, userLogOut),
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
        map((user: User) => {
          this.router.navigateByUrl(`/${user.id}`);
          return userSignInSuccess(user);
        }),
        catchError(({error}) => of(userSignInFailure({error})))
      ))
    )
  );

  userSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignUp),
      switchMap(({username, password}) => from(this.userService.signUp({username, password})).pipe(
        map((user: User) => {
          this.router.navigateByUrl(`/${user.id}`);
          return userSignUpSuccess(user);
        }),
        catchError(({error}) => of(userSignUpFailure({error})))
      ))
    )
  );
}
