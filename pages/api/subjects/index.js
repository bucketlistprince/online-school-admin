import { getSubjects, addSubject, deleteSubject, updateSubject } from 'lib/subjectService';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const subjects = getSubjects();
    res.status(200).json(subjects);
  } else if (req.method === 'POST') {
    const newSubject = req.body;
    const addedSubject = addSubject(newSubject);
    res.status(201).json(addedSubject);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (id) {
      deleteSubject(parseInt(id, 10));
      res.status(204).end();
    } else {
      res.status(400).json({ error: 'ID is required' });
    }
  } else if (req.method === 'PUT') {
    const updatedSubject = req.body;
    updateSubject(updatedSubject);
    res.status(200).json(updatedSubject);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
