import { DataSources } from '../types/global';
import { CommandProcessorFacade } from './CommandProcessorFacade';

export class AddCourseProcessor implements CommandProcessorFacade {
  command: string;
  courseName: string;
  instructor: string;
  courseDate: string;
  minEmployee: number;
  maxEmployee: number;

  constructor(input: any, private dataSources: DataSources) {
    const [
      command,
      courseName,
      instructor,
      courseDate,
      minEmployee,
      maxEmployee
    ] = input;
    this.command = command;
    this.courseName = courseName?.toUpperCase();
    this.instructor = instructor?.toUpperCase();
    this.courseDate = courseDate;
    this.minEmployee = parseInt(minEmployee);
    this.maxEmployee = parseInt(maxEmployee);
  }
  executeCommand(): any {
    if (!this.isValidateCommand()) return;

    const id = this.dataSources.courseDataSource.addCourse(
      this.courseName,
      this.instructor,
      this.courseDate,
      this.minEmployee,
      this.maxEmployee
    );
    console.log(id);
  }

  isValidateCommand(): boolean {
    if (
      this.isMandatoryFieldsMissing() ||
      this.isCourseAlreadyExist() ||
      this.isInstructorAlreadyExist()
    ) {
      console.log('INPUT_DATA_ERROR');
      return false;
    }

    return true;
  }

  isCourseAlreadyExist(): boolean {
    const course = this.dataSources.courseDataSource.getCourseByName(
      this.courseName
    );
    if (course) return true;
    return false;
  }

  isInstructorAlreadyExist(): boolean {
    const course = this.dataSources.courseDataSource.getCourseByInstructor(
      this.instructor
    );
    if (course) return true;
    return false;
  }

  isMandatoryFieldsMissing() {
    if (
      !this.courseName ||
      !this.instructor ||
      !this.courseDate ||
      !this.minEmployee ||
      !this.maxEmployee
    )
      return true;
    return false;
  }
}
