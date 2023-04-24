import { Course } from '../Course';
import { RegisteredEmployee } from '../CourseRegistration';
import { RegistrationStatus } from '../types/global';

export class RegistrationDataSource {
  
  private registrations: RegisteredEmployee[] = [];

  getByRegistrationId(id: string): RegisteredEmployee {
    const employeeRegistration = this.registrations.find(
      (registration) => registration.registrationId === id
    );
    return employeeRegistration;
  }

  getByCourseId(id: string): RegisteredEmployee[] {
    const registeredEmployees = this.registrations.map((registration) => {
      if (registration.courseId === id) {
        return registration;
      }
    });
    return registeredEmployees;
  }

  registerCourse(
    employeeEmail: string,
    employeeName: string,
    courseId: string,
    courseName: string
  ): void {
    const registrationId = `REG-COURSE-${employeeName}-${courseName}`;
    const registeredEmployee = new RegisteredEmployee(
      registrationId,
      courseId,
      employeeName,
      employeeEmail
    );
    this.registrations.push({ ...registeredEmployee });
    console.log(`${registeredEmployee.registrationId} ACCEPTED`);
  }

  allotCourse(course: Course): void {
    const registeredEmployess = this.getByCourseId(course.id);
    registeredEmployess.forEach((registeredEmployee: RegisteredEmployee) => {
      registeredEmployee.status = RegistrationStatus.Confirmed;
      console.log(
        `${registeredEmployee.registrationId} ${registeredEmployee.email} ${course.id} ${course.name} ${registeredEmployee.name} ${course.courseDate} ${RegistrationStatus.Confirmed}`
      );
    });
  }

  cancelCourceRegistration(registrationId: string): any {
    const registerEmployee = this.getByRegistrationId(registrationId);
    const courseId = registerEmployee.courseId;
    if (registerEmployee.status === RegistrationStatus.Accepted) {
      const index = this.registrations.indexOf(registerEmployee);
      this.registrations.splice(index, 1);
      console.log(`${registrationId} CANCEL_ACCEPTED`);
      return { isCourseCancelled: true, courseId };
    }
    console.log(`${registrationId} CANCEL_REJECTED`);
    return { isCourseCancelled: false, courseId };
  }
}
