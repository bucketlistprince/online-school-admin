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

export const deleteCourse = (id) => {
  const courses = getCourses();
  const updatedCourses = courses.filter(course => course.id !== id);
  fs.writeFileSync(coursesFilePath, JSON.stringify(updatedCourses, null, 2), 'utf8');
};

export const updateCourse = (updatedCourse) => {
  const courses = getCourses();
  const courseIndex = courses.findIndex(course => course.id === updatedCourse.id);
  if (courseIndex !== -1) {
    courses[courseIndex] = updatedCourse;
    fs.writeFileSync(coursesFilePath, JSON.stringify(courses, null, 2), 'utf8');
  }
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    const courses = getCourses();
    res.status(200).json(courses);
  } else if (req.method === 'POST') {
    const newCourse = req.body;
    const addedCourse = addCourse(newCourse);
    res.status(201).json(addedCourse);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (id) {
      deleteCourse(parseInt(id, 10));
      res.status(204).end();
    } else {
      res.status(400).json({ error: 'ID is required' });
    }
  } else if (req.method === 'PUT') {
    const updatedCourse = req.body;
    updateCourse(updatedCourse);
    res.status(200).json(updatedCourse);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
