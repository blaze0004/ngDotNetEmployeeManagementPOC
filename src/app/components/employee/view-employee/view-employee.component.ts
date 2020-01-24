import { EmployeeProfile } from './../../../models/employee';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  public employee: Employee = new Employee(null, null, null, null,null,null, null)
  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.pipe(first()).subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.employeeService.getEmployee(id)
              .then(emp => this.employee = emp)
        }
      }
    );
  }

  getEmployeeProfile(): string {
    return EmployeeProfile[this.employee.profile]
  }

  async deleteEmployee(id) {
    await this.employeeService.delete(id)
    
    
  }




  
}
