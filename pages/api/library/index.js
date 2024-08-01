import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { getLibraryResources, saveLibraryResource, uploadFile } from 'lib/libraryService';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const resources = getLibraryResources();
      res.status(200).json(resources);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      res.status(500).json({ error: 'Failed to fetch resources' });
    }
  } else if (req.method === 'POST') {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      uploadDir: path.join(process.cwd(), 'data/uploads'),
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        res.status(500).json({ error: 'File upload failed' });
        return;
      }

      try {
        if (!files.file || !fields.subject) {
          res.status(400).json({ error: 'Missing file or subject' });
          return;
        }

        const fileUrl = uploadFile(files.file[0]);
        const resource = {
          id: Date.now(), // Numeric ID
          subject: fields.subject[0],
          fileUrl,
        };

        saveLibraryResource(resource);
        res.status(201).json(resource);
      } catch (error) {
        console.error('Resource saving error:', error);
        res.status(500).json({ error: 'Failed to save resource' });
      }
    });
  } else {
    res.status(405).end();
  }
};

export default handler;
