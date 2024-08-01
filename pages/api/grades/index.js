import { getGrades, addGrade, deleteGrade, updateGrade } from 'lib/gradeService';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const grades = getGrades();
    res.status(200).json(grades);
  } else if (req.method === 'POST') {
    const newGrade = req.body;
    const addedGrade = addGrade(newGrade);
    res.status(201).json(addedGrade);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (id) {
      deleteGrade(parseInt(id, 10));
      res.status(204).end();
    } else {
      res.status(400).json({ error: 'ID is required' });
    }
  } else if (req.method === 'PUT') {
    const updatedGrade = req.body;
    updateGrade(updatedGrade);
    res.status(200).json(updatedGrade);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
