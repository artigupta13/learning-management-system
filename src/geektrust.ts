import { CommandFactory } from "./Course/CommandFactory";
import { CourseDataSource } from "./datasources/CourseDataSource";

import fs = require("fs");
import { RegistrationDataSource } from "./datasources/RegistrationDataSource";
import { DataSources } from "./types/global";
try {
  const filename = process.argv[2];
  if (filename) {
    const courseDataSource = new CourseDataSource();
    const registrationDataSource = new RegistrationDataSource();

    const dataSources: DataSources = {
      courseDataSource,
      registrationDataSource,
    };

    fs.readFile(filename, "utf8", (err: any, data: any) => {
      if (err) throw err;
      // Add your code here to process input commands
      const inputLines = data.split(/\r?\n/);
      inputLines.forEach((inputLine: any) => {
        const inputParams = inputLine.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
      });
    });
  }
} catch (e) {
  console.log(e);
}
