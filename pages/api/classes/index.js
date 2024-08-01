import { getClasses, addClass, updateClass, deleteClass } from '../../../lib/classService';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const classes = getClasses();
    res.status(200).json(classes);
  } else if (req.method === 'POST') {
    const newClass = req.body;
    const addedClass = addClass(newClass);
    res.status(201).json(addedClass);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (id) {
      deleteClass(parseInt(id, 10));
      res.status(204).end();
    } else {
      res.status(400).json({ error: 'ID is required' });
    }
  } else if (req.method === 'PUT') {
    const updatedClass = req.body;
    updateClass(updatedClass);
    res.status(200).json(updatedClass);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
