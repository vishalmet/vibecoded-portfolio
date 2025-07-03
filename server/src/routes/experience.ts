import express, { Request, Response } from 'express';
import Experience from '../models/experience';

const router = express.Router();

// Helper: check admin password from header
function isAdmin(req: Request) {
  return req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD;
}

// POST /api/experience - Add new experience (admin only, no auth for now)
router.post('/', async (req: Request, res: Response) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// GET /api/experience - Get all experiences
router.get('/', async (_req: Request, res: Response) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// PUT /api/experience/:id - Update experience (admin only)
router.put('/:id', async (req: Request, res: Response) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// DELETE /api/experience/:id - Delete experience (admin only)
router.delete('/:id', async (req: Request, res: Response) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router; 