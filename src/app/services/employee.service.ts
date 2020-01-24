import { SignUpDTO } from "./../models/admin";
import { Employee } from "src/app/models/employee";
import { AuthService } from "src/app/services/auth.service";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  readonly employeesUrl: string = "https://localhost:5001/api/employee";

  employees: Employee[] = null;
  private headers: HttpHeaders = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  private async isLoggedIn() {
    const isLive = await this.authService.isLoggedIn();

    if (isLive) {
      const token = localStorage.getItem("_token");
      let headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`
      });
      return headers;
    }
    this.router.navigate(["/sign-in"]);
    return null;
  }

  public async getEmployee(_id: string): Promise<Employee> {
    const headers = await this.isLoggedIn();
    if (headers)
      return await this.http
        .get<Employee>(`${this.employeesUrl}/${_id}`, { headers })
        .toPromise();
  }

  public async getAllEmployees() {
    const headers = await this.isLoggedIn();

    let response = null;

    if (headers)
      response = await this.http
        .get(this.employeesUrl, { headers })
        .toPromise();

    return response as Employee[];
  }

  public async create(employeeFormData: FormData) {
    console.log('create')
    const headers = (await this.isLoggedIn())
      .delete("Content-Type")
      .append("Content-Type", "multipart/form-data");

    console.log(headers.keys())
    if (headers) {
      await this.http
        .post(this.employeesUrl, employeeFormData, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem("_token")}`
          })
        })
        .toPromise()
        .then(res => {
          console.log(res)
          this.router.navigate(['/'])
        })
        .catch(err => {
          console.log(err)
        });
    }
  }

  public async Update(employeeFormData: FormData) {
    const headers = (await this.isLoggedIn()).delete("Content-Type")
  
    if (headers) {
      await this.http
        .put(
          `${this.employeesUrl}/${employeeFormData.get("id")}`,
          employeeFormData,
          { headers, responseType: 'text' },
        )
        .toPromise()
        .then(res => {
          console.log(res)
          this.router.navigate(['/'])
        })
        .catch(err => console.log('heello', err));
    }

  }

  public async delete(id: string) {

    const isSure = confirm("Are You Sure?")
    if (isSure) {
      const headers = await this.isLoggedIn();
      await this.http
        .delete(`${this.employeesUrl}/${id}`, { headers })
        .toPromise()
        .then(res => {
          console.log(res)
          this.router.navigate(['/'])
        }).catch(err => {
          console.log(err)
        })
    }

    return isSure;
    
  }
}
