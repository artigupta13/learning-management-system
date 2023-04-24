import { CommandFactory } from "../src/Course/CommandFactory";
import { CourseDataSource } from "../src/datasources/CourseDataSource";
import { RegistrationDataSource } from "../src/datasources/RegistrationDataSource";

const INPUT = {
  ONE: "ADD-COURSE-OFFERING PYTHON JOHN 05062023 1 3",
  TWO: "REGISTER WOO@GMAIL.COM OFFERING-PYTHON-JOHN",
  THREE: "REGISTER ANDY@GMAIL.COM OFFERING-PYTHON-JOHN",
  FOUR: "REGISTER BOBY@GMAIL.COM OFFERING-PYTHON-JOHN",
  FIVE: "CANCEL REG-COURSE-BOBY-PYTHON",
  SIX: "ALLOT OFFERING-PYTHON-JOHN",
  SEVEN: "ALLOT OFFERING-PYTHON",
  EIGHT: "REGISTER JOYA@GMAIL.COM OFFERING-PYTHON-JOHN",
  NINE: "REGISTER LILY@GMAIL.COM OFFERING-PYTHON-JOHN",
  TEN: "ADD-COURSE-OFFERING DEVOPS MIKE 05062022 1 3",
  ELEVEN: "REGISTER ELU@GMAIL.COM OFFERING-DEVOPS-MIKE",
  TWELVE: "ADD-COURSE-OFFERING PYTHON JOHN",
  THIRTEEN: "ADD-COURSE-OFFERING PYTHON JOHN 05062023 1 3",
  FOURTEEN: "ADD-COURSE-OFFERING MONGODB JOHN 05062023 1 3",
  FIFTEEN: "ALLOT",
  SIXTEEN: "CANCEL",
  SEVENTEEN: "CANCEL REG-COURSE-BOBY-PYTHON",
  EIGHTEEN: "REGISTER JOYA@GMAIL.COM",
  NINETEEN: "REGISTER JOYA@GMAIL.COM OFFERING-PYTHON-VICKY",
  TWENTY: "SOMETHING",
  TWENTYONE: "CANCEL REG-COURSE-WOO-PYTHON",
};
const OUTPUT = {
  ONE: "OFFERING-PYTHON-JOHN",
  TWO: "REG-COURSE-WOO-PYTHON ACCEPTED",
  THREE: "REG-COURSE-ANDY-PYTHON ACCEPTED",
  FOUR: "REG-COURSE-BOBY-PYTHON ACCEPTED",
  FIVE: "REG-COURSE-BOBY-PYTHON CANCEL_ACCEPTED",
  SIX: "REG-COURSE-WOO-PYTHON WOO@GMAIL.COM OFFERING-PYTHON-JOHN PYTHON WOO 05062023 CONFIRMED",
  SEVEN:
    "REG-COURSE-ANDY-PYTHON ANDY@GMAIL.COM OFFERING-PYTHON-JOHN PYTHON ANDY 05062023 CONFIRMED",
  EIGHT: "REG-COURSE-JOYA-PYTHON ACCEPTED",
  NINE: "OFFERING-DEVOPS-MIKE",
  INPUT_ERROR: "INPUT_DATA_ERROR",
  COURSE_FULL_ERROR: "COURSE_FULL_ERROR",
  COURSE_CANCELED: "COURSE_CANCELED",
  CANCEL_ACCEPTED: "CANCEL_ACCEPTED",
  CANECEL_REJECTED: "CANCEL_REJECTED",
};
describe("geektrust", () => {
  describe("LMS", () => {
    const logSpy = jest.spyOn(console, "log");
    const courseDataSource = new CourseDataSource();
    const registrationDataSource = new RegistrationDataSource();
    const dataSources = {
      courseDataSource,
      registrationDataSource,
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("COMMAND 1- ADD-COURSE-OFFERING PYTHON JOHN 05062023 1 3", () => {
      it("should pass", () => {
        const inputParams = INPUT.ONE.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.ONE);
      });
    });

    describe("COMMAND 2- REGISTER WOO@GMAIL.COM OFFERING-PYTHON-JOHN", () => {
      it("should pass", () => {
        const inputParams = INPUT.TWO.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.TWO);
      });
    });

    describe("COMMAND 3- REGISTER ANDY@GMAIL.COM OFFERING-PYTHON-JOHN", () => {
      it("should pass", () => {
        const inputParams = INPUT.THREE.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.THREE);
      });
    });

    describe("COMMAND 4- REGISTER BOBY@GMAIL.COM OFFERING-PYTHON-JOHN", () => {
      it("should pass", () => {
        const inputParams = INPUT.FOUR.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.FOUR);
      });
    });
    describe("COMMAND 5- CANCEL REG-COURSE-BOBY-PYTHON", () => {
      it("should pass", () => {
        const inputParams = INPUT.FIVE.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.FIVE);
      });
    });

    describe("COMMAND 6- ALLOT OFFERING-PYTHON-JOHN", () => {
      it("should pass", () => {
        const inputParams = INPUT.SIX.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.SIX);
      });
    });

    describe("COMMAND 7- ALLOT OFFERING-PYTHON", () => {
      it("should fail when invalid courseId", () => {
        const inputParams = INPUT.SEVEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 8- REGISTER JOYA@GMAIL.COM OFFERING-PYTHON-JOHN", () => {
      it("should pass", () => {
        const inputParams = INPUT.EIGHT.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.EIGHT);
      });
    });

    describe("COMMAND 9- REGISTER LILY@GMAIL.COM OFFERING-PYTHON-JOHN", () => {
      it('should log "COURSE_FULL_ERROR"', () => {
        const inputParams = INPUT.NINE.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.COURSE_FULL_ERROR);
      });
    });

    describe("COMMAND 10- ADD-COURSE-OFFERING DEVOPS MIKE 05062022 1 3", () => {
      it('should pass"', () => {
        const inputParams = INPUT.TEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.NINE);
      });
    });

    describe("COMMAND 11- REGISTER ELU@GMAIL.COM OFFERING-DEVOPS-MIKE", () => {
      it('should log "COURSE_CANCELED" when course start date is gone ', () => {
        const inputParams = INPUT.ELEVEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.COURSE_CANCELED);
      });
    });

    describe("COMMAND 12- ADD-COURSE-OFFERING PYTHON JOHN", () => {
      it('should log "INPUT_DATA_ERROR" when mandatory fields missing', () => {
        const inputParams = INPUT.TWELVE.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 13- ADD-COURSE-OFFERING PYTHON JOHN 05062023 1 3", () => {
      it('should log "INPUT_DATA_ERROR" when course already exist', () => {
        const inputParams = INPUT.THIRTEEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 14- ADD-COURSE-OFFERING MONGODB JOHN 05062023 1 3", () => {
      it('should log "INPUT_DATA_ERROR" when instructor name already exist', () => {
        const inputParams = INPUT.FOURTEEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 15- ALLOT", () => {
      it('should log "INPUT_DATA_ERROR" when mandatory fields missing', () => {
        const inputParams = INPUT.FIFTEEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 16- CANCEL", () => {
      it('should log "INPUT_DATA_ERROR" when mandatory fields missing', () => {
        const inputParams = INPUT.SIXTEEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 17- CANCEL REG-COURSE-BOBY-PYTHON", () => {
      it('should log "INPUT_DATA_ERROR" when invalid registrationId', () => {
        const inputParams = INPUT.SEVENTEEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 18- REGISTER JOYA@GMAIL.COM", () => {
      it('should log "INPUT_DATA_ERROR" when mandatory fields missing', () => {
        const inputParams = INPUT.EIGHTEEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 19- REGISTER JOYA@GMAIL.COM OFFERING-PYTHON-VICKY", () => {
      it('should log "INPUT_DATA_ERROR" when invalid courseId', () => {
        const inputParams = INPUT.NINETEEN.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 20- SOMETHING", () => {
      it('should log "INPUT_DATA_ERROR" when command is invalid', () => {
        const inputParams = INPUT.TWENTY.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(OUTPUT.INPUT_ERROR);
      });
    });

    describe("COMMAND 21- CANCEL REG-COURSE-WOO-PYTHON", () => {
      it('should log "CANCEL_REJECTED" when course already alloted ', () => {
        const inputParams = INPUT.TWENTYONE.split(" ");
        const processor = new CommandFactory().getCommandProcessor(
          inputParams,
          dataSources
        );
        processor?.executeCommand();
        expect(logSpy).toBeCalledWith(
          `REG-COURSE-WOO-PYTHON ${OUTPUT.CANECEL_REJECTED}`
        );
      });
    });
  });
});
