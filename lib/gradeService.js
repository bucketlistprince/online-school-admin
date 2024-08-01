import fs from 'fs';
import path from 'path';

const gradesFilePath = path.join(process.cwd(), 'data', 'grades.json');

export const getGrades = () => {
  const fileContents = fs.readFileSync(gradesFilePath, 'utf8');
  return JSON.parse(fileContents);
};

export const addGrade = (newGrade) => {
  const grades = getGrades();
  const newId = grades.length > 0 ? Math.max(...grades.map((g) => g.id)) + 1 : 1;
  const gradeWithId = { ...newGrade, id: newId };
  grades.push(gradeWithId);
  fs.writeFileSync(gradesFilePath, JSON.stringify(grades, null, 2), 'utf8');
  return gradeWithId;
};

export const deleteGrade = (id) => {
  const grades = getGrades();
  const updatedGrades = grades.filter(grade => grade.id !== id);
  fs.writeFileSync(gradesFilePath, JSON.stringify(updatedGrades, null, 2), 'utf8');
};

export const updateGrade = (updatedGrade) => {
  const grades = getGrades();
  const gradeIndex = grades.findIndex(grade => grade.id === updatedGrade.id);
  if (gradeIndex !== -1) {
    grades[gradeIndex] = updatedGrade;
    fs.writeFileSync(gradesFilePath, JSON.stringify(grades, null, 2), 'utf8');
  }
};
