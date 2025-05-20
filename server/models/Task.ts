import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    
    status: {
        default: "todo",
        type: String
    },

    completed: {
        default: false,
        type: Boolean
    },

    id: { type: String }
});

export default mongoose.model("Task", TaskSchema);