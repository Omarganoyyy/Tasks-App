import express from 'express'
import { connectDB } from './DB/connect.db.js'
const app = express()
const port = 3000
import  taskController from './tasks/task.controller.js'

/**
 * Configures Express, connects to MongoDB, mounts task routes, and starts the server.
 * @returns {Promise<void>} Resolves after the server is listening.
 */
export async function bootstrap() {
    app.use(express.json())
    await connectDB()

    app.use("/tasks",taskController)

    app.listen(port, () => {
        console.log(`App is on port ${port}`)
    })
}
