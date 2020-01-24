
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import {
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatSelectModule,
  MatCardModule,
  MatGridListModule
} from "@angular/material";
import { DashboardComponent } from "./components/employee/dashboard/dashboard.component";
import { AddEmployeeComponent } from "./components/employee/add-employee/add-employee.component";
import { FormsModule } from "@angular/forms";
import { SignInComponent } from "./components/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { ViewEmployeeComponent } from "./components/employee/view-employee/view-employee.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    AddEmployeeComponent,
    SignInComponent,
    SignUpComponent,
    ViewEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
