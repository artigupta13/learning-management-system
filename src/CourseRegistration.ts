import { RegistrationStatus } from './types/global';

export class RegisteredEmployee {
  registrationId: string;
  courseId: string;
  email: string;
  name: string;
  status: string;

  constructor(
    registrationId: string,
    courseId: string,
    name: string,
    email: string
  ) {
    (this.registrationId = registrationId),
      (this.courseId = courseId),
      (this.name = name),
      (this.email = email),
      (this.status = RegistrationStatus.Accepted);
  }
}
