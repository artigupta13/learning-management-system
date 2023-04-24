export class Course {
  id: string;
  name: string;
  instructor: string;
  courseDate: string;
  minEmployee: number;
  maxEmployee: number;
  status: string;
  totalEnrollment = 0;

  constructor(
    name: string,
    instructor: string,
    courseDate: string,
    minEmployee: number,
    maxEmployee: number
  ) {
    this.id = `OFFERING-${name}-${instructor}`;
    this.name = name;
    this.courseDate = courseDate;
    this.instructor = instructor;
    this.minEmployee = minEmployee;
    this.maxEmployee = maxEmployee;
  }
}
