import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  userData: Observable<firebase.User>;

  constructor(private http: HttpClient,
              private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /* Firebase sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      console.log('Successfully signed in!');
    })
    .catch(error => {
      console.log('Something went wrong');
    });
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
    .auth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed up!', res);
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
    });
  }

  // login(username: string, password: string) {
  //   return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
  //   .pipe(map(user => {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     localStorage.setItem('currentUser', JSON.stringify(user));
  //     this.currentUserSubject.next(user);
  //     return user;
  //   }));
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
