import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const taskSchema = new Schema({
    title: {type: String, require: true, trim: true},
    description: {type: String, require: true, trim: true},
    completed: {type: Boolean, default: false}
}, {
    versionKey: false,
    timestamps: true
});

taskSchema.plugin(mongoosePaginate);
const Task = model("Task", taskSchema);

export default Task;