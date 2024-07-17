import express from "express";

import { createAppointment, getAppointmentsByDate, getAppointmenById, updateAppointment, deleteAppointment } from "../controllers/appointmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

router.route("/")
    .post(authMiddleware, createAppointment)
    .get(authMiddleware, getAppointmentsByDate)

router.route("/:id")
    .get(authMiddleware, getAppointmenById)
    .put(authMiddleware, updateAppointment)
    .delete(authMiddleware, deleteAppointment)





export default router;

