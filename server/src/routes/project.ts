import express, { Request, Response } from 'express';
import Project from '../models/project';
import upload from '../middleware/upload';
import path from 'path';

const router = express.Router();

function isAdmin(req: Request) {
  return req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD;
}

// POST /api/projects/upload - Upload project image (admin only)
router.post('/upload', isAdminMiddleware, upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const imageUrl = `/uploads/projects/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

function isAdminMiddleware(req: Request, res: Response, next: any) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// POST /api/projects - Add new project (admin only)
router.post('/', isAdminMiddleware, upload.single('image'), async (req: Request, res: Response) => {
  try {
    let image = req.body.image;
    if (req.file) {
      image = `/uploads/projects/${req.file.filename}`;
    }
    let tags = req.body.tags;
    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch { tags = [tags]; }
    }
    const project = new Project({ ...req.body, image, tags });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
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
router.put('/:id', isAdminMiddleware, upload.single('image'), async (req: Request, res: Response) => {
  try {
    let image = req.body.image;
    if (req.file) {
      image = `/uploads/projects/${req.file.filename}`;
    }
    let tags = req.body.tags;
    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch { tags = [tags]; }
    }
    const updated = await Project.findByIdAndUpdate(req.params.id, { ...req.body, image, tags }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
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