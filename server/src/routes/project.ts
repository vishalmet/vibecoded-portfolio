// Add this at the top if you don't have @types/busboy installed
// declare module 'busboy';

import express, { Request, Response } from 'express';
import Project from '../models/project';
import { put } from '@vercel/blob';
import Busboy from 'busboy';

const router = express.Router();

function isAdmin(req: Request) {
  return req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD;
}

function isAdminMiddleware(req: Request, res: Response, next: any) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// Helper to handle multipart form with busboy and upload to Vercel Blob
function handleProjectForm(req: Request, res: Response, isUpdate = false) {
  const busboy = Busboy({ headers: req.headers });
  let imageUrl = '';
  const fields: any = {};
  let fileUploadPromise: Promise<any> | null = null;

  busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string) => {
    if (fieldname === 'image' && filename) {
      // Cast file to any to satisfy @vercel/blob's type
      fileUploadPromise = put(`projects/${Date.now()}-${filename}`, file as any, {
        access: 'public',
        addRandomSuffix: true,
        contentType: mimetype,
      }).then(blob => {
        imageUrl = blob.url;
      });
    } else {
      file.resume(); // skip other files
    }
  });

  busboy.on('field', (fieldname: string, val: string) => {
    if (fieldname === 'tags') {
      if (!fields.tags) fields.tags = [];
      fields.tags.push(val);
    } else {
      fields[fieldname] = val;
    }
  });

  busboy.on('finish', async () => {
    if (fileUploadPromise) await fileUploadPromise;
    // tags is now always an array if present
    const tags = fields.tags || [];
    if (isUpdate) {
      // For update, get id from req.params
      const update: any = { ...fields, tags };
      if (imageUrl) update.image = imageUrl;
      try {
        const updated = await Project.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    } else {
      // For create
      const project = new Project({ ...fields, image: imageUrl, tags });
      try {
        await project.save();
        res.status(201).json(project);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    }
  });

  req.pipe(busboy);
}

// POST /api/projects - Add new project (admin only)
router.post('/', isAdminMiddleware, (req: Request, res: Response) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    handleProjectForm(req, res, false);
  } else {
    // fallback for non-file requests (e.g. JSON)
    let { image, tags, ...fields } = req.body;
    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch { tags = [tags]; }
    }
    const project = new Project({ ...fields, image, tags });
    project.save()
      .then(saved => res.status(201).json(saved))
      .catch(error => res.status(400).json({ error: (error as Error).message }));
  }
});

// GET /api/projects - Get all projects
router.get('/', async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ _id: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id', isAdminMiddleware, (req: Request, res: Response) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    handleProjectForm(req, res, true);
  } else {
    // fallback for non-file requests (e.g. JSON)
    let { image, tags, ...fields } = req.body;
    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch { tags = [tags]; }
    }
    Project.findByIdAndUpdate(req.params.id, { ...fields, image, tags }, { new: true })
      .then(updated => {
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
      })
      .catch(error => res.status(400).json({ error: (error as Error).message }));
  }
});

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router; 