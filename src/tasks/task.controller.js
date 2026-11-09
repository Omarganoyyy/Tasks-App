import Router from 'express'
const router = Router()
import * as taskService from './task.service.js'

router.post('/create-task',taskService.addNewTask)
router.get('/view-tasks',taskService.viewTasks)
router.get('/view-tasks/:taskId',taskService.viewSingleTask)
router.patch('/status/:taskId',taskService.updateStatus)
router.delete('/:taskId',taskService.deleteTask)

/**
 * Exports the router containing the task API routes.
 * @type {import('express').Router}
 */
export default router