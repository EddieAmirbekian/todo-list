import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {TodoComponent} from "./components/todo/todo.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: ':id', component: TodoComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
