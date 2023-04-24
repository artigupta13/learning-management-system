import { CourseDataSource } from "../datasources/CourseDataSource";
import { RegistrationDataSource } from "../datasources/RegistrationDataSource";

export enum Command {
  AddCourse = "ADD-COURSE-OFFERING",
  RegisterCourse = "REGISTER",
  ALLOT = "ALLOT",
  CANCEL = "CANCEL",
}

export interface RegisteredEmployee {
  registrationId: string;
  courseId: string;
  email: string;
  name: string;
  status: string;
}

export enum RegistrationStatus {
  Accepted = "ACCEPTED",
  Confirmed = "CONFIRMED",
}

export interface DataSources {
  courseDataSource: CourseDataSource;
  registrationDataSource: RegistrationDataSource;
}
