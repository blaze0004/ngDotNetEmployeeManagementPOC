import { EmployeeService } from "./../../../services/employee.service";
import {
  Component,
  OnInit,
  ɵCompiler_compileModuleSync__POST_R3__
} from "@angular/core";
import { Employee } from "src/app/models/employee";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"]
})
export class AddEmployeeComponent implements OnInit {
  public employee: Employee = new Employee(
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );

  employeePhotoData: File = null;
  previewURL: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  fileName: string = null;

  constructor(
    private employeeService: EmployeeService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id)
        this.employeeService.getEmployee(id).then(emp => {
          this.employee = emp;
          
        });
    });
  }

  saveAndConvertImage(imageData: any) {
    this.employeePhotoData = <File>imageData.target.files[0];
    this.fileName = this.employeePhotoData.name.split("/").pop();
    // console.log(this.fileName)
    this.preview();
  }

  preview() {
    var mimeType = this.employeePhotoData.type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.employeePhotoData);

    reader.onload = _event => {
      this.previewURL = reader.result;
      this.employee.photo = this.previewURL;
    };
  }

  addOrUpdateEmployee({
    id,
    name,
    phone,
    email,
    salary,
    profile,
    photo
  }: Employee) {
    let employeeFormData: FormData = new FormData();

    this.employee = {
      ...this.employee,
      name,
      email,
      phone,
      salary,
      profile,
      photo
    };

    employeeFormData.append("name", name);
    employeeFormData.append("email", email);
    employeeFormData.append("phone", phone);
    employeeFormData.append("salary", salary.toString());
    employeeFormData.append("profile", profile.toString());
    if (!this.employee.id) {
      employeeFormData.append("photo", this.employeePhotoData);
      this.employeeService.create(employeeFormData);
    } else {
      if (this.employeePhotoData) employeeFormData.append('photo', this.employeePhotoData)

      !id
        ? employeeFormData.append("id", this.employee.id)
        : employeeFormData.append("id", id);

      this.employeeService.Update(employeeFormData);
    }
  }
}
