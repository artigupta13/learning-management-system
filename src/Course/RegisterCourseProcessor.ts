import { Course } from '../Course';
import { DataSources } from '../types/global';
import { CommandProcessorFacade } from './CommandProcessorFacade';

export class RegisterCourseProcessor implements CommandProcessorFacade {
  command: string;
  email: string;
  courseId: string;
  employeeName: string;

  constructor(input: any, private dataSources: DataSources) {
    const [command, email, courseId] = input;
    this.command = command;
    this.email = email?.toUpperCase();
    this.courseId = courseId?.toUpperCase();
    this.employeeName = email.split('@')?.[0];
  }

  executeCommand(): void {
    if (!this.isValidateCommand()) return;

    const course = this.dataSources.courseDataSource.getCourseById(
      this.courseId
    );
    this.dataSources.courseDataSource.updateEnrollmentCount(this.courseId, 1);
    this.dataSources.registrationDataSource.registerCourse(
      this.email,
      this.employeeName,
      course.id,
      course.name
    );
  }

  isValidateCommand(): boolean {
    if (this.isMandatoryFieldsMissing() || this.isInvalidCourseId()) {
      console.log('INPUT_DATA_ERROR');
      return false;
    }

    const course = this.dataSources.courseDataSource.getCourseById(
      this.courseId
    );

    if (this.isCourseCancelled(course)) {
      console.log('COURSE_CANCELED');
      return false;
    }

    if (this.isCourseFull(course)) {
      console.log('COURSE_FULL_ERROR');
      return false;
    }
    return true;
  }

  isCourseCancelled(course: Course): boolean {
    const [dd, mm, yyyy] = [
      course.courseDate.slice(0, 2),
      course.courseDate.slice(2, 4),
      course.courseDate.slice(4, 8)
    ];
    const dateformat = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
    const courseDate = new Date(dateformat).getTime();
    const currentDate = new Date().getTime();
    if (course.totalEnrollment < course.minEmployee && courseDate < currentDate)
      return true;
    return false;
  }

  isCourseFull(course: Course): boolean {
    if (course.totalEnrollment === course.maxEmployee) return true;
    return false;
  }

  isMandatoryFieldsMissing() {
    if (!this.email || !this.courseId) return true;
    return false;
  }

  isInvalidCourseId(): boolean {
    if (!this.dataSources.courseDataSource.getCourseById(this.courseId))
      return true;
    return false;
  }
}
