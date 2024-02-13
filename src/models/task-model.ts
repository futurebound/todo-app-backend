import mongoose, { Schema } from 'mongoose'

const taskSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: "User", // references User model/schema
      required: true
   },
   categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category", // references Category model/schema
      required: true
   },
   isCompleted: {
      type: Boolean,
      default: false
   },
   isEditable: {
      type: Boolean,
      default: true
   },
   date: {
      type: String,
      required: true
   }
},
{
   timestamps: true
})

// initiates creation of model
const Task = mongoose.model("Task", taskSchema)

export default Task