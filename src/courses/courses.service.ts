import * as fs from 'fs';
import { HttpException, Injectable } from '@nestjs/common';
import { title } from 'process';
import { COURSES } from './courses.mock';
import { rejects } from 'assert';

@Injectable()
export class CoursesService {
  courses = COURSES;

  getCourses(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.courses);
    });
  }

  getCourse(coursesId): Promise<any> {
    const id = Number(coursesId);
    return new Promise((resolve) => {
      const course = this.courses.find((course) => course.id === id);
      if (!course) {
        throw new HttpException('Course does not exist', 404);
      }
      resolve(course);
    });
  }

  addCourse(course): Promise<any> {
    return new Promise((resolve) => {
      this.courses.push(course);
      resolve(this.courses);
    });
  }

  deleteCourse(courseId): Promise<any> {
    const id = Number(courseId);
    return new Promise((resolve) => {
      const index = this.courses.findIndex((course) => course.id === id);
      if (index === -1) {
        throw new HttpException('Course does not exist', 404);
      }
      this.courses.splice(index, 1);
      resolve(this.courses);
    });
  }

  putCourse(courseId: any, createCourseDto: any) {
    return new Promise((resolve) => {
      const existCourse = this.courses.find((c: any) => c.id === courseId);
      if (!existCourse) {
        resolve('error');
      }
      this.courses.splice(this.courses.indexOf(existCourse));
      this.courses.push(createCourseDto);
      resolve(this.courses.shift());
    });
  }

  // writeFile function with filename, content and callback function
  saveCourse(courses) {
    return new Promise((resolve) => {
      fs.writeFile('courses.json', JSON.stringify(courses), function (err) {
        if (err) {
          throw err;
        } else {
          resolve('ok!');
        }
      });
    });
  }
}
