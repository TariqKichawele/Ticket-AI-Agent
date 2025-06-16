import express from "express";
import { createTicket, getTickets, getTicket, deleteTicket } from "../controllers/TicketController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, createTicket);
router.get("/", authenticate, getTickets);
router.get("/:id", authenticate, getTicket);
router.delete("/:id", authenticate, deleteTicket);

export default router;