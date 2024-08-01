// pages/api/roles/[id].js
import fs from 'fs';
import path from 'path';

const rolesFilePath = path.join(process.cwd(), 'data', 'roles.json');

const readRoles = () => {
  const fileData = fs.readFileSync(rolesFilePath, 'utf8');
  return JSON.parse(fileData);
};

const writeRoles = (data) => {
  fs.writeFileSync(rolesFilePath, JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  const { id } = req.query;
  const roleId = parseInt(id, 10);

  if (req.method === 'GET') {
    // Fetch a single role by ID
    const roles = readRoles();
    const role = roles.find((r) => r.id === roleId);

    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } else if (req.method === 'PUT') {
    // Update a role by ID
    const { name } = req.body;
    const roles = readRoles();
    const roleIndex = roles.findIndex((r) => r.id === roleId);

    if (roleIndex === -1) {
      return res.status(404).json({ message: 'Role not found' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Role name is required' });
    }

    roles[roleIndex] = { id: roleId, name };
    writeRoles(roles);

    res.status(200).json(roles[roleIndex]);
  } else if (req.method === 'DELETE') {
    // Delete a role by ID
    const roles = readRoles();
    const roleIndex = roles.findIndex((r) => r.id === roleId);

    if (roleIndex === -1) {
      return res.status(404).json({ message: 'Role not found' });
    }

    roles.splice(roleIndex, 1);
    writeRoles(roles);

    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
