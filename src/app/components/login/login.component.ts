import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {Observable, Subject, tap} from "rxjs";
import {userNavigate, userSignIn, userSignUp} from "../../store/user/user.actions";
import {Router} from "@angular/router";
import {selectUserError} from "../../store/user/user.selectors";

interface FormType {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup<FormType>({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errors$: Observable<string | null> = this.store.select(selectUserError).pipe(
    tap(console.log)
  );

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(userNavigate());
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  signIn(): void {
    if (!this.loginForm.invalid) {
      this.store.dispatch(userSignIn(this.loginForm.value));
    }
  }

  signUp(): void {
    if (!this.loginForm.invalid) {
      this.store.dispatch(userSignUp(this.loginForm.value));
      this.store.dispatch(userNavigate());
    }
  }

  private goToUser(id: string): void {
    this.router.navigateByUrl(`/${id}`);
  }

  private goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
