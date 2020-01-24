import { SignInDTO } from './../../../models/admin';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  

  user: SignInDTO = { email: "", password: ""}
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('_token')) this.router.navigate(['/'])
  }

  signIn(form: any) {
    
    this.authService.signIn(form);
    
  }

  ngOnDestroy(): void {
  }

}
