import { AuthService } from './../../../services/auth.service';
import { SignUpDTO } from './../../../models/admin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  user: SignUpDTO = {name: "", email: "", password: "", confirmPassword: ""}
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    if (localStorage.getItem('_token')) this.router.navigate(['/'])
    this.signUpForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.pattern(new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"))]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), this.matchPassword]),
      confirmPassword: this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), this.matchPassword])
    })
  }

  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value.password;
    const confirmPassword = control.value.confirmPassword;

    if (password === confirmPassword) {
      return null;
    } else {
     return {'passwordNotMatched': true} 
    }
  }

  

  signUp() {

    console.log(this.signUpForm.value)

    this.authService.createAccount(this.signUpForm.value);

  }

}
