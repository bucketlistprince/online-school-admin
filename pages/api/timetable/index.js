import { getTimetables, addTimetable } from '/lib/timetableService';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const timetables = await getTimetables();
      res.status(200).json(timetables);
    } else if (req.method === 'POST') {
      const newTimetable = req.body;
      if (!newTimetable.name) {
        return res.status(400).json({ message: 'Timetable name is required' });
      }
      const addedTimetable = await addTimetable(newTimetable);
      res.status(201).json(addedTimetable);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling API request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
