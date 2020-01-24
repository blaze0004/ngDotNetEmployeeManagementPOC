import { Employee } from 'src/app/models/employee';
import { EmployeeService } from './../../../services/employee.service';
import { AddEmployeeComponent } from './../add-employee/add-employee.component';
import { EmployeeProfile } from "./../../../models/employee";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogActions } from "@angular/material";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  dataSource: MatTableDataSource<Employee>;
  columnToDisplay: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, private employeeService: EmployeeService) {}
  async ngOnInit() {
    let employees = await this.employeeService.getAllEmployees()
    
    this.dataSource = new MatTableDataSource<Employee>(employees);
    this.columnToDisplay = ["name", "email", "profile", "action"];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  openDialog(): void{

    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Dialog was closed')
    });
   }

   
   getEmployeeProfile(profile) {
     return EmployeeProfile[profile]
   }

   async deleteEmployee(empId: string) {

        const isSure = await this.employeeService.delete(empId)
        if (isSure)
        this.dataSource.data = this.dataSource.data.filter(emp => empId != emp.id)
        
   }

   

}
