import { AuthService } from './../../../services/auth.service';
import { SignUpDTO } from './../../../models/admin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: SignUpDTO = {name: "", email: "", password: "", confirmPassword: ""}
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('_token')) this.router.navigate(['/'])
    
  }

  

  signUp(form: any) {
    const {name, email, password, confirmPassword} = form;

    this.authService.createAccount({name, email, password, confirmPassword});

  }

}
