import { Router } from "express";
import {
  getDiaryById,
  getAllDiaries,
  deleteEntries,
  createEntry,
  modifyEntry
} from "../controllers/diary.controller";
import { validate } from "../middleware/validate.middleware";
import { verifiedToken } from "../middleware/verify_token.middleware";

const router = Router();

router.get("/entries", verifiedToken, getAllDiaries);
router.get("/entries/:id", verifiedToken, getDiaryById);
router.post("/entries", verifiedToken, validate, createEntry);
router.delete("/entries/:id", verifiedToken, deleteEntries);
router.patch("/entries/:id", verifiedToken, validate, modifyEntry);

export default router;
