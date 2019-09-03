import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUri: string;
  error = '';

  email: string;
  password: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  )  {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signIn() {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUri = this.route.snapshot.queryParams['returnUri'] || '/';
  }

  get f() { return this.loginForm.controls; }

  // onSubmit() {
  //   this.submitted = true;
  //
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //
  //   this.loading = true;
  //   this.authenticationService.login(this.f.username.value, this.f.password.value)
  //   .pipe(first())
  //   .subscribe(
  //     data => {
  //       this.router.navigate([this.returnUri]);
  //     },
  //     error => {
  //       this.error = error;
  //       this.loading = false;
  //     }
  //   );
  // }

}
