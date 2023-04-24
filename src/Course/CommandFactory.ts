import { Command, DataSources } from '../types/global';
import { AddCourseProcessor } from './AddCourseProcessor';
import { AllotCourseProcessor } from './AllotCourseProcessor';
import { CancelCourseRegistrationProcessor } from './CancelCourseRegistrationProcessor';
import { RegisterCourseProcessor } from './RegisterCourseProcessor';

export class CommandFactory {
  getCommandProcessor(input: any, dataSources: DataSources) {
    switch (input[0]) {
      case Command.AddCourse:
        return new AddCourseProcessor(input, dataSources);
      case Command.RegisterCourse:
        return new RegisterCourseProcessor(input, dataSources);
      case Command.ALLOT:
        return new AllotCourseProcessor(input, dataSources);
      case Command.CANCEL:
        return new CancelCourseRegistrationProcessor(input, dataSources);
      default: {
        console.log('INPUT_DATA_ERROR');
        return;
      }
    }
  }
}
