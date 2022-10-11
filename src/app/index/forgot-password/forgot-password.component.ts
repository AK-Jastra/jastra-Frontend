import { Component, OnInit } from '@angular/core';
import {AdminService  } from "../../services/admin.service";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  refreshLink = 0;
  showform = 'new';
  // Object for forget Password
  forgetpasswordObj = {
    email: '',
    otp: '',
    password: '',
    cpassword: '',
    _csrf: null,
  };
  // error object
  errorObj = {
    email: '',
    otp: '',
    password: '',
    cpassword: '',

  };
  constructor(private adminService: AdminService,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    if (this.apiService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');

    } else {
      //this.getCsrf();
    }
  }

  // Function to remove validation error
  clearError(field) {
    switch (field) {
      case 'otp':
        this.errorObj.otp = '';
        break;
      case 'email':
        this.errorObj.email = '';
        break;
      case 'password':
        this.errorObj.password = '';
        break;
      case 'cpassword':
        this.errorObj.cpassword = '';
        break;


    }
  }
  // forget password work start

  // get otp by email


}
