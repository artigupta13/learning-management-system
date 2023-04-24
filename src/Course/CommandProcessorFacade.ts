export interface CommandProcessorFacade {
  isValidateCommand(): boolean;
  executeCommand(): any;
}
