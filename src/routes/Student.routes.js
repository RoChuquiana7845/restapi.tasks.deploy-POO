import { Router } from "express";
import * as studentCtrl from "../controllers/student.controller.js";
import { NoID } from "../helpers/NoID.js";

const router = Router();

router.get("/", studentCtrl.findAllStudent);

router.post("/", studentCtrl.createStudent);

router.get('/:id', studentCtrl.findOneStudent);

router.delete('/', NoID);

router.delete('/:id', studentCtrl.deleteStudent);

router.put('/update/', NoID);

router.put('/update/:id', studentCtrl.updateStudent);

export default router;