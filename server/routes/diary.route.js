import { Router } from 'express';
import {
  getDiaryById, getAllDiaries, deleteEntries, createEntry, modifyEntry,
} from '../controllers/diary.controller';
import { verifiedToken } from '../middleware/verify_token.middleware';
import { addDiarySchema, diaryparamsschema } from '../middleware/validate.middleware';

const router = Router();

router.get('/entries', verifiedToken, getAllDiaries);
router.get('/entries/:id', verifiedToken, diaryparamsschema, getDiaryById);
router.post('/entries', addDiarySchema, verifiedToken, createEntry);
router.delete('/entries/:id', verifiedToken, deleteEntries);
router.patch('/entries/:id', addDiarySchema, verifiedToken, modifyEntry);

export default router;
