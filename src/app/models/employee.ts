export class Employee {

  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public salary: number,
    public photo: string,
    public profile: EmployeeProfile,
    public id?: string,
  ) {}
}

export enum EmployeeProfile {
  INTERN,
  TRAINEE,
  DEVELOPER
}
