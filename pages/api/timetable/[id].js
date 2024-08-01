import { getTimetableById, updateTimetable, deleteTimetable } from '/lib/timetableService';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const timetable = await getTimetableById(id);
      if (timetable) {
        res.status(200).json(timetable);
      } else {
        res.status(404).json({ message: 'Timetable not found' });
      }
    } else if (req.method === 'PUT') {
      const updatedTimetable = req.body;
      await updateTimetable(id, updatedTimetable);
      res.status(200).json(updatedTimetable);
    } else if (req.method === 'DELETE') {
      await deleteTimetable(id);
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling API request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
