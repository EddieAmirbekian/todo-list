import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {selectAllUsers, selectCurrentUser} from "../../store/user/user.selectors";
import {iif, Subject, takeUntil, tap} from "rxjs";
import {User} from "../../models/user.model";
import {loadUsers, userNavigate, userSignIn, userSignUp} from "../../store/user/user.actions";
import {Router} from "@angular/router";

interface FormType {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup<FormType>({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(userNavigate());
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

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  private goToUser(id: string): void {
    this.router.navigateByUrl(`/${id}`);
  }

  private goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
