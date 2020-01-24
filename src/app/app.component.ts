import { Component, OnInit } from "@angular/core";
import { AuthService } from './services/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
 
  title = "employee-management";

  constructor(private authService: AuthService) {
  }


  ngOnInit(): void {
    (localStorage.getItem('_token')) ? this.authService.isLoggedIn().next(true) : this.authService.isLoggedIn().next(false)
  }
}
