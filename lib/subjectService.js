import fs from 'fs';
import path from 'path';

const subjectsFilePath = path.join(process.cwd(), 'data', 'subjects.json');

export const getSubjects = () => {
  const fileContents = fs.readFileSync(subjectsFilePath, 'utf8');
  return JSON.parse(fileContents);
};

export const addSubject = (newSubject) => {
  const subjects = getSubjects();
  const newId = subjects.length > 0 ? Math.max(...subjects.map((s) => s.id)) + 1 : 1;
  const subjectWithId = { ...newSubject, id: newId };
  subjects.push(subjectWithId);
  fs.writeFileSync(subjectsFilePath, JSON.stringify(subjects, null, 2), 'utf8');
  return subjectWithId;
};

export const deleteSubject = (id) => {
  const subjects = getSubjects();
  const updatedSubjects = subjects.filter(subject => subject.id !== id);
  fs.writeFileSync(subjectsFilePath, JSON.stringify(updatedSubjects, null, 2), 'utf8');
};

export const updateSubject = (updatedSubject) => {
  const subjects = getSubjects();
  const subjectIndex = subjects.findIndex(subject => subject.id === updatedSubject.id);
  if (subjectIndex !== -1) {
    subjects[subjectIndex] = updatedSubject;
    fs.writeFileSync(subjectsFilePath, JSON.stringify(subjects, null, 2), 'utf8');
  }
};
