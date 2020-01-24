import { AuthService } from 'src/app/services/auth.service';
import { AddEmployeeComponent } from './../../employee/add-employee/add-employee.component';
import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService) { 
    
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  public logOut() {
    this.authService.logOut();
  }

  

}
