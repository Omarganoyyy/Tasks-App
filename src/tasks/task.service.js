import TaskModel from "../DB/models/task.model.js";

/**
 * Checks for a matching title and creates a task when one is not found.
 * @param {import('express').Request} req Express request containing the task title.
 * @param {import('express').Response} res Express response.
 * @param {import('express').NextFunction} next Express error handler.
 * @returns {Promise<void>} Sends the creation result or forwards an error.
 */
export const addNewTask = async (req, res, next) => {
    try {
        const { title } = req.body;

        const taskExists = await TaskModel.findOne({ title });

        if (!taskExists) {
            await TaskModel.create({
                title: title
            });
            return res.status(201).json({ message: "Task Added" });
        }

        return res.status(409).json({ message: "Task Already Exists" });

    } catch (error) {
        return next(error);
    }
};

/**
 * Retrieves all stored tasks.
 * @param {import('express').Request} req Express request.
 * @param {import('express').Response} res Express response.
 * @param {import('express').NextFunction} next Express error handler.
 * @returns {Promise<void>} Sends the task list or forwards an error.
 */
export const viewTasks = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find({})

        if (tasks.length == 0) {
            return res.status(200).json({ message: "No Tasks Yet" })
        }

        return res.status(200).json(tasks)

    } catch (error) {
        return next(error);
    }
}

/**
 * Retrieves one task by its MongoDB ID.
 * @param {import('express').Request} req Express request containing taskId.
 * @param {import('express').Response} res Express response.
 * @param {import('express').NextFunction} next Express error handler.
 * @returns {Promise<void>} Sends the task or not-found result, or forwards an error.
 */
export const viewSingleTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await TaskModel.findOne({
            _id: taskId
        });

        if (!task) {
            return res.status(404).json({ message: "No Task Found" });
        }

        return res.status(200).json({
            success: true,
            task
        });

    } catch (error) {
        return next(error);
    }
};

/**
 * Updates a task's completion status.
 * @param {import('express').Request} req Express request containing taskId and completed.
 * @param {import('express').Response} res Express response.
 * @param {import('express').NextFunction} next Express error handler.
 * @returns {Promise<void>} Sends the update result or forwards an error.
 */
export const updateStatus = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const { completed } = req.body;

        if (typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be true or false"
            });
        }

        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: taskId },
            { completed },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }

        return res.status(200).json({
            message: "Done",
            task: updatedTask
        });

    } catch (error) {
        return next(error);
    }
};

/**
 * Deletes a task by its MongoDB ID.
 * @param {import('express').Request} req Express request containing taskId.
 * @param {import('express').Response} res Express response.
 * @param {import('express').NextFunction} next Express error handler.
 * @returns {Promise<void>} Sends the deleted task or not-found result, or forwards an error.
 */
export const deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

       
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        // If no task matches the ID, return 404 Not Found
        if (!deletedTask) {
            return res.status(404).json({ message: "Task Not Found" });
        }

        return res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask 
        });

    } catch (error) {
        return next(error);
    }
};