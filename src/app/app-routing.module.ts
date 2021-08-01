import { UpdateComponent } from './components/update/update.component';
import { CreateComponent } from './components/create/create.component';
import { ContentComponent } from './components/content/content.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "",
    component: ContentComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "dragon/:id",
    component: UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
