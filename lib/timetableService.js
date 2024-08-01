import fs from 'fs';
import path from 'path';

// Path to the timetable data file
const dataFilePath = path.join(process.cwd(), 'data', 'timetable.json');

// Function to get all timetables
export async function getTimetables() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading timetable file:', error);
    throw new Error('Error reading timetable data');
  }
}

// Function to add a new timetable
export async function addTimetable(newTimetable) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const timetables = JSON.parse(data);

    // Generate the next ID
    const nextId = timetables.length ? Math.max(...timetables.map(t => t.id)) + 1 : 1;

    // Add default empty details field
    const timetableWithId = { ...newTimetable, id: nextId, details: [] };

    // Add the new timetable to the array
    timetables.push(timetableWithId);

    // Write the updated timetable data back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(timetables, null, 2), 'utf8');

    return timetableWithId;
  } catch (error) {
    console.error('Error adding timetable:', error);
    throw new Error('Error adding timetable data');
  }
}

// Function to get a timetable by ID
export async function getTimetableById(id) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const timetables = JSON.parse(data);
    return timetables.find(t => t.id === parseInt(id, 10)); // Ensure ID is an integer
  } catch (error) {
    console.error('Error reading timetable file:', error);
    throw new Error('Error reading timetable data');
  }
}

// Function to update a timetable by ID
export async function updateTimetable(id, updatedTimetable) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const timetables = JSON.parse(data);
    const index = timetables.findIndex(t => t.id === parseInt(id, 10));

    if (index !== -1) {
      timetables[index] = updatedTimetable;
      fs.writeFileSync(dataFilePath, JSON.stringify(timetables, null, 2), 'utf8');
    } else {
      throw new Error('Timetable not found');
    }
  } catch (error) {
    console.error('Error updating timetable:', error);
    throw new Error('Error updating timetable data');
  }
}

// Function to delete a timetable by ID
export async function deleteTimetable(id) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const timetables = JSON.parse(data);
    const updatedTimetables = timetables.filter(t => t.id !== parseInt(id, 10));
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedTimetables, null, 2), 'utf8');
  } catch (error) {
    console.error('Error deleting timetable:', error);
    throw new Error('Error deleting timetable data');
  }
}
