import { trusted } from "mongoose";
import Task from "../models/Task.js";
import { getPagination } from "../libs/getPagination.js";

export const findAllTasks = async (req, res) => {
  try {
    const { size, page, title} = req.query;

    const condition = title ? {
      title: { $regex: new RegExp(title), $options: "i" },
    } : {};

    const {limit, offset} = getPagination(page, size);
    const data = await Task.paginate(condition ,{offset, limit});
    
    res.json({
      totalItems: data.totalDocs,
      task: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page -1
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the task",
    });
  }
};

export const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }
  try {
    const { title, description, completed } = req.body;
    const newTask = new Task({ title, description, completed });
    const taskSaved = await newTask.save();
    console.log(newTask);
    res.json({ "New Task created": taskSaved });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating  the task",
    });
  }
};

export const findAllDoneTask = async (req, res) => {
  const task = await Task.find({ completed: { $eq: true } }).exec();
  res.json(task);
};

export const findOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: `Task with id ${id} does not exists`,
      });
    }
    return res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error Retrieving Task with id: ${id}`,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    res.json({
      message: `${task.title} Task were deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Cannot delete task with id: ${id}`,
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  console.log()
  try {
    if (!Object.keys(req.body).length) {
      return res.status(200).json({
        message: `Excellent did not change anything`,
      });
    }
    await Task.findByIdAndUpdate(id, req.body);
    res.json({
      message: `Task was updated Successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Cannot update task with id: ${id}`,
    });
  }
};
