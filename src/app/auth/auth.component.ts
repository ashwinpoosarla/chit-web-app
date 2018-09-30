import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  options = {
    number: '',
    pin: ''
  };
  
  constructor(private route: Router) { 
    
  }

  onSubmit() {
    
    this.route.navigateByUrl('/dashboard');
  }

  ngOnInit() {
  }

}
