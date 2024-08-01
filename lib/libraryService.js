import fs from 'fs';
import path from 'path';

const resourcesFilePath = path.join(process.cwd(), 'data', 'library.json');
const uploadsDirectory = path.join(process.cwd(), 'data', 'uploads');

export const getLibraryResources = () => {
  if (!fs.existsSync(resourcesFilePath)) {
    fs.writeFileSync(resourcesFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(resourcesFilePath);
  return JSON.parse(data);
};

export const saveLibraryResource = (resource) => {
  const resources = getLibraryResources();
  resources.push(resource);
  fs.writeFileSync(resourcesFilePath, JSON.stringify(resources));
};

export const uploadFile = (file) => {
  try {
    const filePath = path.join(uploadsDirectory, file.newFilename);
    fs.renameSync(file.filepath, filePath);
    return `/data/uploads/${file.newFilename}`;
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error('Failed to upload file');
  }
};
