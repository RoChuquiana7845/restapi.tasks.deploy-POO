import { Router } from "express";
import * as studentCtrl from "../controllers/student.controller.js"

const router = Router();

router.get("/", studentCtrl.findAllStudent);

router.post("/", studentCtrl.createStudent);

router.get('/:id', studentCtrl.findOneStudent);

router.delete('/:id', studentCtrl.deleteStudent);

router.put('/:id', studentCtrl.updateStudent);

export default router;