import { Router } from 'express';
import {
    createEntry
} from '../controllers/diary.controller';
import { verifiedToken } from '../middleware/verify_token.middleware';
import { addDiarySchema } from '../middleware/validate.middleware';

const router = Router();


router.post('/entries', addDiarySchema, verifiedToken, createEntry);



export default router;