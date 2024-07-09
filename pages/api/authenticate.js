import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'data', 'adminData.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const adminData = JSON.parse(fileContents);

      if (username === adminData.username && password === adminData.password) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, error: 'Invalid username or password' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
