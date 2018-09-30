import { Component, OnInit, Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import * as firebase from 'firebase';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-modify-user',
  templateUrl: './add-modify-user.component.html',
  styleUrls: ['./add-modify-user.component.css']
})
export class AddModifyUserComponent implements OnInit {
  modalData = {
    title: 'Add user',
    NAME: '',
    PHONE: '',
    SECONDARY_PHONE: '',
    IS_ADMIN: false,
    IS_AGENT: false,
    IS_CUSTOMER: false,
    ADDRESS: '',
    EMAIL: '',
    ID: 0
  };
  constructor(private dialogRef: MatDialogRef<AddModifyUserComponent>, @Inject(MAT_DIALOG_DATA) public data : any,
    public us: UsersService) {
      let tempUser = this.us.getUser();
      Object.assign(this.modalData, tempUser); 
      if(data.isAdd){
        
      }
      else{
        this.modalData.title = 'Update user';
        this.modalData.NAME = data.NAME;
        this.modalData.PHONE = data.PHONE;
        this.modalData.SECONDARY_PHONE = data.SECONDARY_PHONE;
        this.modalData.EMAIL = data.EMAIL;
        this.modalData.ADDRESS = data.ADDRESS;
        this.modalData.IS_ADMIN = data.IS_ADMIN;
        this.modalData.IS_AGENT = data.IS_AGENT;
        this.modalData.IS_CUSTOMER = data.IS_CUSTOMER;
        this.modalData.ID = data.ID;
      }
      dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  save() {
    console.log(this.modalData);
    let dbRef = firebase.database().ref('USERS/');
    let idx = 1;

    if(this.data.isAdd){
      idx = this.us.generateId();
      let saveModal = {
        ID: idx,
        NAME: this.modalData.NAME,
        PHONE: this.modalData.PHONE,
        SECONDARY_PHONE: this.modalData.SECONDARY_PHONE,
        ADDRESS: this.modalData.ADDRESS,
        EMAIL: this.modalData.EMAIL,
        IS_ADMIN: this.modalData.IS_ADMIN,
        IS_AGENT: this.modalData.IS_AGENT,
        IS_CUSTOMER: this.modalData.IS_CUSTOMER
      };
      dbRef.child(idx.toString()).set(saveModal, (error) => {
        if (error) {
          console.error("User could not be added." + error);
        } else {
              console.log('-----User added-----');
              this.us.fetchUsers();
              setTimeout(() => {
                this.closeDialog();
              }, 1000);
              
        }
      })
    }
    else{
      let saveModal = {
        ID: this.modalData.ID,
        NAME: this.modalData.NAME,
        PHONE: this.modalData.PHONE,
        SECONDARY_PHONE: this.modalData.SECONDARY_PHONE,
        ADDRESS: this.modalData.ADDRESS,
        EMAIL: this.modalData.EMAIL,
        IS_ADMIN: this.modalData.IS_ADMIN,
        IS_AGENT: this.modalData.IS_AGENT,
        IS_CUSTOMER: this.modalData.IS_CUSTOMER
      };
      dbRef.child(saveModal.ID.toString()).update(saveModal, (error) => {
        if (error) {
          console.error("User could not be modified." + error);
        } else {
          console.log('-----User updated-----');
          this.us.fetchUsers();
          setTimeout(() => {
            this.closeDialog();
          }, 1000);
        }
      });

    }

  }

  public closeDialog(){
    this.dialogRef.close();
  }

}
