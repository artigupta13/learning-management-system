import { DataSources } from '../types/global';
import { CommandProcessorFacade } from './CommandProcessorFacade';

export class CancelCourseRegistrationProcessor
  implements CommandProcessorFacade
{
  command: string;
  registrationId: string;

  constructor(input: any, private dataSources: DataSources) {
    const [command, registrationId] = input;
    this.command = command;
    this.registrationId = registrationId?.toUpperCase();
  }
  executeCommand(): any {
    if (!this.isValidateCommand()) return;

    const { isCourseCancelled, courseId } =
      this.dataSources.registrationDataSource.cancelCourceRegistration(
        this.registrationId
      );
    if (isCourseCancelled) {
      this.dataSources.courseDataSource.updateEnrollmentCount(courseId, -1);
    }
  }

  isValidateCommand(): boolean {
    if (!this.registrationId || this.isInvalidRegistrationId()) {
      console.log('INPUT_DATA_ERROR');
      return false;
    }
    return true;
  }

  isInvalidRegistrationId() {
    if (
      !this.dataSources.registrationDataSource.getByRegistrationId(
        this.registrationId
      )
    )
      return true;
    return false;
  }
}
