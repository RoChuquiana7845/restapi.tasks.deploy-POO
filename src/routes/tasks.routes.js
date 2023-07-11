import { Router } from "express";
import * as taskCtrl from "../controllers/task.controller.js"

const router = Router();

router.get("/", taskCtrl.findAllTasks);

router.get('/completed', taskCtrl.findAllDoneTask);

router.post("/", taskCtrl.createTask);

router.get('/:id', taskCtrl.findOneTask);

router.delete('/:id', taskCtrl.deleteTask);

router.put('/:id', taskCtrl.updateTask);

export default router;