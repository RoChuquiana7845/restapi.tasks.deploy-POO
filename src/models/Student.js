import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const StudentSchema = new Schema({
    name: {type: String, require: true, trim: true}, 
    dni: { type: String, require: true, trim: true},
    note1: {type: Number, require: true, trim: true},
    note2: {type: Number, require: true, trim: true},
    note3: {type: Number, require: true, trim: true},
},  {
    versionKey: false,
    timestamps: true
});

StudentSchema.plugin(mongoosePaginate);
const Student = model('Student', StudentSchema);

export default Student;