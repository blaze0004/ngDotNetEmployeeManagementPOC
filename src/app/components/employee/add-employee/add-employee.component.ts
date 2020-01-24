import { EmployeeService } from "./../../../services/employee.service";
import {
  Component,
  OnInit,
  ɵCompiler_compileModuleSync__POST_R3__
} from "@angular/core";
import { Employee } from "src/app/models/employee";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"]
})
export class AddEmployeeComponent implements OnInit {
  addUpdateEmployeeForm: FormGroup;

  // public employee: Employee = new Employee(
  //   null,
  //   null,
  //   null,
  //   null,
  //   null,
  //   null,
  //   null
  // );

  employeePhotoData: File = null;
  previewURL: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  fileName: string = null;

  constructor(
    private employeeService: EmployeeService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id)
        this.employeeService.getEmployee(id).then(emp => {
          this.addUpdateEmployeeForm.setValue(emp)
          console.log(this.addUpdateEmployeeForm.controls)
        });
    });

    this.addUpdateEmployeeForm = this.formBuilder.group({
      id: this.formBuilder.control("", [Validators.minLength(24), Validators.maxLength(24)]),
      name: this.formBuilder.control("", [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(
          new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")
        )
      ]),
      email: this.formBuilder.control("", [
        Validators.required,
        Validators.email
      ]),
      phone: this.formBuilder.control("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      salary: this.formBuilder.control(0, [
        Validators.required,
        Validators.min(0)
      ]),
      profile: this.formBuilder.control(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(2)
      ]),
      photo: this.formBuilder.control({}, [Validators.required])
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
      this.addUpdateEmployeeForm.controls.photo.setValue(this.previewURL)
    };
  }

  addOrUpdateEmployee() {
    let employeeFormData: FormData = new FormData();

    this.addUpdateEmployeeForm.patchValue( {
      ...this.addUpdateEmployeeForm.value,
    });

    employeeFormData.append("name", this.addUpdateEmployeeForm.controls.name.value);
    employeeFormData.append("email", this.addUpdateEmployeeForm.controls.email.value);
    employeeFormData.append("phone", this.addUpdateEmployeeForm.controls.phone.value);
    employeeFormData.append("salary", this.addUpdateEmployeeForm.controls.salary.value);
    employeeFormData.append("profile", this.addUpdateEmployeeForm.controls.profile.value);
    debugger;
    if (this.addUpdateEmployeeForm.controls.id.value === '') {
      employeeFormData.append("photo", this.employeePhotoData);
      console.log('no id')
      this.employeeService.create(employeeFormData);
    } else {
      console.log('id')
      if (this.employeePhotoData)
        employeeFormData.append("photo", this.employeePhotoData);
      employeeFormData.append('id', this.addUpdateEmployeeForm.controls.id.value)

      this.employeeService.Update(employeeFormData);
    }
  }
}
