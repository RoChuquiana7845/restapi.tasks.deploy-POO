import { trusted } from "mongoose";
import Student from "../models/Student.js";
import { getPagination } from "../libs/getPagination.js";

export const findAllStudent = async (req, res) => {
  try {
    const { size, page, name } = req.query;

    const condition = name ? {
      name: { $regex: new RegExp(name), $options: "i" },
    } : {};

    const {limit, offset} = getPagination(page, size);
    const data = await Student.paginate(condition ,{offset, limit});

    if (!data.length) { 
      return res.status(200).json({ 
        message: "mmm...This place is too empty"
      })
    }
    
    res.json({
      totalItems: data.totalDocs,
      Student: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page -1
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the student",
    });
  }
};

export const createStudent = async (req, res) => {
    const { name, dni, note1, note2, note3 } = req.body
    console.log(req.body);
  if (!Object.keys(req.body).length) {
    return res.status(400).json({message: "mmmm... There is no content to save"})
  } else if (!name) {
    return res.status(400).json({ message: "Why are you creating an unnamed student?" });
  } else if (!dni) { 
    return res.status(400).json({message: "I cannot believe it, an student without DNI"});
  } else if (!note1) { 
    return res.status(400).json({message: "You should put a value in the note1"});
  } else if (!note2) {
    return res.status(400).json({message: "You should put a value in the note2"});
  } else if (!note3) { 
    return res.status(400).json({message: "You should put a value in note3"});
  }
  try {
    const newStudent = new Student({ name, dni, note1, note2, note3});
    const studentSaved = await newStudent.save();
    res.status(200).json({ "New Student created": studentSaved });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating  the student",
    });
  }
};


export const findOneStudent = async (req, res) => {
    const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        message: `Student with id ${id} does not exists`,
      });
    }
    return res.json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error Retrieving Student with id: ${id}`,
    });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndDelete(id);
    res.status(200).json({
      message: `${task.title} Task were deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Cannot delete task with id: ${id}`,
    });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Object.keys(req.body).length) {
      return res.status(200).json({
        message: `Excellent, you didn't change anything`,
      });
    }
    await Student.findByIdAndUpdate(id, req.body);
    res.json({
      message: `Student was updated Successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Cannot update student with id: ${id}`,
    });
  }
};