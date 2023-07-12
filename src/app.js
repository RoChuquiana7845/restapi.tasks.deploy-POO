import express from "express";
import morgan from "morgan";
import cors from 'cors';
import TasksRoutes from "./routes/tasks.routes.js";
import StudentRoutes from "./routes/Student.routes.js"

const app = express();

//Settings
app.set("port", process.env.PORT || 4001);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});
app.use("/api/tasks", TasksRoutes);
app.use("/api/student", StudentRoutes);
export default app;
