import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  users: User[];
  loading = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  deleteUser(id: number) {
    console.log('button works', id);
    this.userService.delete(id);
    const index = this.users.indexOf(id);
    if (index !== -1) {
      return this.users.splice(index, 1);
    }
  }



}
