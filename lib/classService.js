import fs from 'fs';
import path from 'path';

const classesFilePath = path.join(process.cwd(), 'data', 'classes.json');

export const getClasses = () => {
  const fileContents = fs.readFileSync(classesFilePath, 'utf8');
  return JSON.parse(fileContents);
};

export const addClass = (newClass) => {
  const classes = getClasses();
  const newId = classes.length > 0 ? Math.max(...classes.map((c) => c.id)) + 1 : 1;
  const classWithId = { ...newClass, id: newId };
  classes.push(classWithId);
  fs.writeFileSync(classesFilePath, JSON.stringify(classes, null, 2), 'utf8');
  return classWithId;
};

export const updateClass = (updatedClass) => {
  const classes = getClasses();
  const updatedClasses = classes.map((cls) =>
    cls.id === updatedClass.id ? updatedClass : cls
  );
  fs.writeFileSync(classesFilePath, JSON.stringify(updatedClasses, null, 2), 'utf8');
  return updatedClass;
};

export const deleteClass = (classId) => {
  const classes = getClasses();
  const filteredClasses = classes.filter((cls) => cls.id !== classId);
  fs.writeFileSync(classesFilePath, JSON.stringify(filteredClasses, null, 2), 'utf8');
};
