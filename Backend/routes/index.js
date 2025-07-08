import express from 'express'
import authRoutes from './authRoutes.js';

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

export default router;