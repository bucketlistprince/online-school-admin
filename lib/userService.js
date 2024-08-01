import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

// Helper function to read users data
const readUsersData = () => {
  const fileContent = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(fileContent);
};

// Get all users
export const getAllUsers = () => {
  const users = readUsersData();
  return users;
};

// Get user by ID
export const getUserById = (id) => {
  const users = readUsersData();
  return users.find(user => user.id === id);
};
