import fs from 'fs';
import path from 'path';

const coursesFilePath = path.join(process.cwd(), 'data', 'courses.json');

export const getCourses = () => {
  const fileContents = fs.readFileSync(coursesFilePath, 'utf8');
  return JSON.parse(fileContents);
};

export const addCourse = (newCourse) => {
  const courses = getCourses();
  const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
  const courseWithId = { ...newCourse, id: newId };
  courses.push(courseWithId);
  fs.writeFileSync(coursesFilePath, JSON.stringify(courses, null, 2), 'utf8');
  return courseWithId;
};

export const updateCourse = (updatedCourse) => {
  const courses = getCourses();
  const updatedCourses = courses.map((course) =>
    course.id === updatedCourse.id ? updatedCourse : course
  );
  fs.writeFileSync(coursesFilePath, JSON.stringify(updatedCourses, null, 2), 'utf8');
  return updatedCourse;
};

export const deleteCourse = (courseId) => {
  const courses = getCourses();
  const filteredCourses = courses.filter((course) => course.id !== courseId);
  fs.writeFileSync(coursesFilePath, JSON.stringify(filteredCourses, null, 2), 'utf8');
};
