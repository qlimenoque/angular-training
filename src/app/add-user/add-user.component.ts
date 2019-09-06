import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;
  error = '';
  returnUri: string;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: [null, Validators.required],
        gender: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }
    );
    this.returnUri = this.route.snapshot.queryParams.returnUri || '/users';
  }

  get f() {
    return this.addUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      console.log(this.addUserForm);
      return;
    }

    this.loading = true;
    this.userService.create(this.addUserForm.value)
    .subscribe(data => this.router.navigate(['/users']), error => {
        this.loading = false;
      }
    );
  }
}
