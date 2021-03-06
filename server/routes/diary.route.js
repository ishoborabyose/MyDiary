import { Router } from 'express';
import {
    createEntry, getAllDiaries, modifyEntry, deleteEntries, getDiaryById
} from '../controllers/diary.controller';
import { verifiedToken } from '../middleware/verify_token.middleware';
import { addDiarySchema , diaryparamsschema} from '../middleware/validate.middleware';

const router = Router();


router.get( '/entries', verifiedToken, getAllDiaries );
router.get('/entries/:id', verifiedToken, diaryparamsschema, getDiaryById);
router.post( '/entries', addDiarySchema, verifiedToken, createEntry );
router.patch( '/entries/:id', addDiarySchema, verifiedToken, modifyEntry );
router.delete('/entries/:id', verifiedToken, deleteEntries);

export default router;
