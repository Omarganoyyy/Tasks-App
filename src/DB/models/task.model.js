import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Defines stored task fields and enables createdAt/updatedAt timestamps.
 * @type {import('mongoose').Schema}
 */
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Automatically manages createdAt and updatedAt for you!
});

/**
 * Mongoose model used to read and write task documents.
 * @type {import('mongoose').Model}
 */
const TaskModel = mongoose.model('Task', taskSchema);
export default TaskModel;
