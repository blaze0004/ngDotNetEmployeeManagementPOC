import { SignInDTO } from "./../../../models/admin";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit, OnDestroy {
  private signInForm: FormGroup;

  user: SignInDTO = { email: "", password: "" };
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (localStorage.getItem("_token")) this.router.navigate(["/"]);

    this.signInForm = this.formBuilder.group({
      email: this.formBuilder.control("", [
        Validators.required,
        Validators.email
      ]),
      password: this.formBuilder.control("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])
    });
  }

  signIn() {
    console.log(this.signInForm);
    this.authService.signIn(this.signInForm.value);
  }

  ngOnDestroy(): void {}
}
