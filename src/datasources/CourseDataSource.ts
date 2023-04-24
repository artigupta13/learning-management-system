import { Course } from '../Course';

export class CourseDataSource {

  private courses: Course[]=[];

  addCourse(
    courseName: string,
    instructor: string,
    courseDate: string,
    minEmployee: number,
    maxEmployee: number
  ): string {
    const course = new Course(
      courseName,
      instructor,
      courseDate,
      minEmployee,
      maxEmployee
    );
    this.courses.push({ ...course });
    return course.id;
  }

  getCourseById(id: string): Course {
    const course = this.courses.find((course) => course.id === id);
    return course;
  }

  getCourseByName(name: string): Course {
    const course = this.courses.find((course) => course.name === name);
    return course;
  }

  getCourseByInstructor(instructor: string): Course {
    const course = this.courses.find((course) => course.instructor === instructor);
    return course;
  }

  getCourses(): Course[] {
    return this.courses;
  }

  updateEnrollmentCount(id: string, count: number) {
    const index = this.courses.findIndex((course) => course.id === id);
    this.courses[index].totalEnrollment += count;
  }
}
