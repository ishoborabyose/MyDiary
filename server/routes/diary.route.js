import { Router } from 'express';
import {
    createEntry, getAllDiaries
} from '../controllers/diary.controller';
import { verifiedToken } from '../middleware/verify_token.middleware';
import { addDiarySchema } from '../middleware/validate.middleware';

const router = Router();


router.get('/entries', verifiedToken, getAllDiaries);
router.post('/entries', addDiarySchema, verifiedToken, createEntry);



export default router;