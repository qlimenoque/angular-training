import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  user: User;
  queryId: number;
  paramsSubscribe: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: [null, Validators.required],
        gender: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }
    );
    this.paramsSubscribe = this.route.params.subscribe(params => this.queryId = params.id);

    this.userService.getUser(this.queryId).subscribe(res => {
      this.editUserForm.controls.username.setValue(res.username);
      this.editUserForm.controls.firstName.setValue(res.firstName);
      this.editUserForm.controls.lastName.setValue(res.lastName);
      this.editUserForm.controls.age.setValue(res.age);
      this.editUserForm.controls.gender.setValue(res.gender);
      this.editUserForm.controls.password.setValue(res.password);
    });
  }

  onSubmit() {
    const body = {
      firstName: this.editUserForm.controls.firstName.value,
      lastName: this.editUserForm.controls.lastName.value,
      age: this.editUserForm.controls.age.value,
      gender: this.editUserForm.controls.gender.value
    };

    return this.userService.updateUser(this.queryId, body);
  }
}
