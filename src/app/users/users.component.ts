import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {MatSnackBar} from '@angular/material';
import { UsersService} from '../users.service';
import { AddModifyUserComponent } from '../add-modify-user/add-modify-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];
  constructor(public us: UsersService, public dialog : MatDialog, public snackBar: MatSnackBar) {
    this.users = this.us.getUsers();
  }

  ngOnInit() {
  }

  refreshUsers(){
    this.users = this.us.getUsers();
  }

  updateUser(u) {
    let data = {isAdd: false, callback : this.refreshUsers};
    Object.assign(data, u);
    this.dialog.open(AddModifyUserComponent, {
      data: data,
      width: '400px'
    })
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddModifyUserComponent, {
      data: {isAdd: true},
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshUsers();
      this.snackBar.open('User added', '', {
        duration: 2000
      });
    });
  }

}
