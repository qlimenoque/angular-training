import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [AuthGuard]},
  { path: 'users/add', component: AddUserComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddUserComponent,
    UserListComponent,
    EditUserComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
