import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  paramsSubscribe: Subscription;
  queryId: number;
  user = new User();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.paramsSubscribe = this.route.params.subscribe(params => this.queryId = params.id);
    this.userService.get(this.queryId).subscribe(x => this.user = x);
  }

}
