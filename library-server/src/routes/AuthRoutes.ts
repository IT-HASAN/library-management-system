import express from 'express';
import AuthController from '../controllers/AuthController';
import { Schemas, ValidateSchema } from '../middlewares/Validation';

const router = express.Router();

router.post("/register", ValidateSchema(Schemas.user.create),AuthController.handleRegister);

export = router;