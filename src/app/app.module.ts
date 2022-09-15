import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {TodoModule} from "./components/todo/todo.module";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {todoReducer} from "./store/todo/todo.reducer";
import {TodoEffects} from "./store/todo/todo.effects";
import {userReducer} from "./store/user/user.reducer";
import {UserEffects} from "./store/user/user.effects";
import {LoginModule} from "./components/login/login.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      todos: todoReducer,
      users: userReducer,
    }),
    EffectsModule.forRoot([TodoEffects, UserEffects]),
    LoginModule,
    TodoModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
