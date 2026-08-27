import express, { Request, Response } from 'express';
import View from '../models/views';

const router = express.Router();

// GET /api/views - Get total portfolio views count
router.get('/', async (_req: Request, res: Response) => {
  try {
    let viewDoc = await View.findOne();
    if (!viewDoc) {
      viewDoc = await View.create({ count: 0 });
    }
    res.json({ count: viewDoc.count });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/views - Increment and get total portfolio views count
router.post('/', async (_req: Request, res: Response) => {
  try {
    const viewDoc = await View.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ count: viewDoc.count });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
