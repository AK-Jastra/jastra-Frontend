import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../validators/password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userobj = {
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  };
  // error object
  errorObj = {
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  };
  // Object for customer login
  loginObj = {
    email: "",
    password: "",
  };
  adminRegister: FormGroup;
  loginAdmin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  showform = "new";
  admins: any;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,

  ) {
    this.adminRegister = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,4}$')]),
      email: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9]{2,}(?:[._]{1}[a-zA-Z0-9]+){0,2}@[a-zA-Z]{2,20}[.]{1}[a-zA-Z]{2,4}(?:[.]{1}[a-zA-Z]+){0,1}$')]),
      password: new FormControl('', [Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$#?!@%^&*-]).{8,24}$')]),
      confirmPassword: new FormControl('', [Validators.required])
    },
      { validators: MustMatch('password', 'confirmPassword') });
  }

  ngOnInit() {
    this.getAdminStatus();
  }


  // check-in if admin available or create new
  getAdminStatus() {
    this.adminService.getAdminStatus().subscribe(
      (success) => {
        if (success.exist === true) {
          this.showform = "new";
        } else {
          this.showform = "new1";
        }
      },
      (error) => {
        // this.loading = false;
        // this.notif.error(
        //   // 'Error',
        //   'something went wrong'
        // )
      }
    );
  }

  // convenience getter for easy access to form fields
  get controls() { return this.loginAdmin.controls; }
    // convenience getter for easy access to form fields
    get registerControls() { return this.adminRegister.controls; }


    adminLogin(): void {
      if (this.loginAdmin.invalid) {
        return;
      } else {
        this.adminService.loginAdmin(this.loginAdmin.value).subscribe((login) => {
          if (login.success) {
            this.snackBar.open("Admin login successfully.", 'X', { duration: 4000, panelClass: ['success-snackbar'], horizontalPosition: 'end' })
            this.loginAdmin.reset();
            this.router.navigate(['overview']);
          } else {
            this.snackBar.open(login.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          }
        }, (error) => {
          this.snackBar.open('Something went wrong!', 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        })
      }
    }
  
  
    adminSignup(): void {
      if (this.adminRegister.invalid) {
        return;
      } else {
        this.adminService.registerAdmin(this.adminRegister.value).subscribe((registeration) => {
          if (registeration.success) {
            this.snackBar.open("Admin registration successfully.", 'X', { duration: 4000, panelClass: ['success-snackbar'], horizontalPosition: 'end' });
            this.adminRegister.reset();
            this.getAdminStatus()
            this.router.navigate(['login']);
          } else {
            this.snackBar.open(registeration.msg, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
          }
        }, (error) => {
          this.snackBar.open('Something went wrong!', 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        });
      }
    }

}
