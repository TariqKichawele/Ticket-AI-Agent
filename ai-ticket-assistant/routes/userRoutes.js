import express from "express";
import { signup, login, logout, updateUser, getUsers } from "../controllers/UserController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", authenticate, updateUser);
router.get("/users", authenticate, getUsers);

export default router;