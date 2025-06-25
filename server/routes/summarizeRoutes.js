import express from 'express';
import { generateSummary } from '../controllers/summarizeController.js';

const router = express.Router();

// POST /api/generate-summary
router.post('/generate-summary', generateSummary);

export default router; 