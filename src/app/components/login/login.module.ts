import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {MatCardModule} from "@angular/material/card";
import {UserService} from "../../services/user.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent],
  providers: [UserService]
})
export class LoginModule {}
