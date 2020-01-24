import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  Observable,
  of,
  Subscriber,
  Subject,
  BehaviorSubject,
  Subscription
} from "rxjs";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  readonly signUpURL: string = "https://localhost:5001/api/admin";
  readonly signInURL: string = "https://localhost:5001/api/auth";

  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    localStorage.getItem("_token")
      ? this.isLoggedSubject.next(true)
      : this.isLoggedSubject.next(false);
  }

  public createAccount({ name, email, password, confirmPassword }) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    });
    const data = { name, email, password };
    if (password === confirmPassword) {
      this.http.post(this.signUpURL, data, { headers }).subscribe(
        res => {
           console.log(res)
           alert('Account Created.. Please Login Using Credentials.')
           this.router.navigate(["/sign-in"]); 
        },
        err => {
          console.log(err)

        }
      );
      
    } else {
      console.log('password not match.')
    }
      
  }

  public async signIn({ email, password }) {
    // console.log(email, password)
    let headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    });
    const data = { email, password };
    const response = await this.http
      .post(this.signInURL, data, { headers })
      .toPromise()
      .catch(err => {
        console.log("Wrong Credentials.");
        alert("Wrong Credentials");
        return null;
      });

    if (response == null) return ;
    const { id, token }: any = response;
    localStorage.setItem("id", id);
    localStorage.setItem("_token", token);
    this.router.navigate(["/"]);

    this.isLoggedSubject.next(true);
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedSubject;
  }

  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("_token");

    this.router.navigate(["/sign-in"]);
    this.isLoggedSubject.next(false);
  }
}
