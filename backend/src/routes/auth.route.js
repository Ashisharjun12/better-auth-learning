import { Router } from "express";
import { getSession } from "../controllers/auth.controller.js";


const router = Router();


router.get("/" ,getSession);

export default router;
