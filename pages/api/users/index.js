import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'data', 'users.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle fetching users
    try {
      const data = fs.readFileSync(usersPath, 'utf8');
      const users = JSON.parse(data);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to read users data' });
    }
  } else if (req.method === 'POST') {
    // Handle adding a new user
    const { username, email, role, password } = req.body;
    try {
      const data = fs.readFileSync(usersPath, 'utf8');
      const users = JSON.parse(data);
      const newUser = { id: users.length + 1, username, email, role, password };
      users.push(newUser);
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to save user' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
