import { DataSources } from '../types/global';
import { CommandProcessorFacade } from './CommandProcessorFacade';

export class AllotCourseProcessor implements CommandProcessorFacade {
  command: string;
  courseId: string;

  constructor(input: any, private dataSources: DataSources) {
    const [command, courseId] = input;
    this.command = command;
    this.courseId = courseId?.toUpperCase();
  }
  executeCommand(): any {
    if (!this.isValidateCommand()) return;

    const course = this.dataSources.courseDataSource.getCourseById(
      this.courseId
    );
    this.dataSources.registrationDataSource.allotCourse(course);
  }

  isValidateCommand(): boolean {
    if (this.isMandatoryFieldsMissing() || this.isInvalidCourseId()) {
      console.log('INPUT_DATA_ERROR');
      return false;
    }
    return true;
  }

  isMandatoryFieldsMissing() {
    if (!this.courseId) return true;
    return false;
  }

  isInvalidCourseId(): boolean {
    if (!this.dataSources.courseDataSource.getCourseById(this.courseId))
      return true;
    return false;
  }
}
