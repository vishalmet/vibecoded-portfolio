import express, { Request, Response } from 'express';

const router = express.Router();

// POST /api/admin/login
router.post('/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  // For demo, just return success (no session/cookie)
  res.status(200).json({ message: 'Login successful' });
});

export default router; 