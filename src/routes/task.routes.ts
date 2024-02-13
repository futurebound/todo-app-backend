import express from 'express'
import { createTask, deleteTask, getAllTasks, getAllTasksByCategory, toggleTaskCompletion } from '../controllers/task.controller'
import authenticationMiddleware from '../middleware/index'


// link up middleware/index.ts for use on routes
const taskRoutes = express.Router()
taskRoutes.use(authenticationMiddleware)

// register Task routes
taskRoutes.route('/getAll').get(getAllTasks)
taskRoutes.route('/getAllByCategory/:id').get(getAllTasksByCategory)

taskRoutes.route('/create').post(createTask)

taskRoutes.route('/updateCompletion/:id').put(toggleTaskCompletion)
// taskRoutes.route('/update/:id').put(updateTask)

taskRoutes.route('/delete/:id').delete(deleteTask)


export default taskRoutes