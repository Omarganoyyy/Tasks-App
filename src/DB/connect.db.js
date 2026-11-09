import mongoose from "mongoose";

/**
 * Connects Mongoose to the local TaskApp database.
 * @returns {Promise<void>} Resolves after the connection attempt completes.
 */
export const connectDB = async () => {
    try {
        const mongooseURI = await mongoose.connect("mongodb://localhost:27017/TaskApp")
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("Couldn't Connect DB", error)
    }
}
