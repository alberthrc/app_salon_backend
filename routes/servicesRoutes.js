import express from "express"

import { getServices, createService, getServicesById, updateService, deleteService } from "../controllers/servicesController.js"

const router = express.Router()


router.get("/", getServices)
router.post("/", createService)
router.get("/:id", getServicesById)
router.put("/:id", updateService)
router.delete("/:id", deleteService)




export default router