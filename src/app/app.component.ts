import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { UsersService } from './users.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(private http: HttpClient, private _users: UsersService){
    firebase.initializeApp(fireConfig);

    this._users.fetchUsers();
  }

}
