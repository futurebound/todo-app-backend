import express from 'express'
import { createTask, deleteTask, getAllCompletedTasks, getAllTasks, 
   getAllTasksByCategory, getTasksForToday, toggleTaskCompletion } from '../controllers/task.controller'
import authenticationMiddleware from '../middleware/index'


// link up middleware/index.ts for use on routes
const taskRoutes = express.Router()
taskRoutes.use(authenticationMiddleware)

/* Register Task routes */
// Create
taskRoutes.route('/create').post(createTask)

// Retrieve
taskRoutes.route('/getAll').get(getAllTasks)
taskRoutes.route('/getAllByCategory/:id').get(getAllTasksByCategory)
taskRoutes.route('/getAllCompleted').get(getAllCompletedTasks)
taskRoutes.route('/getAllToday').get(getTasksForToday)

// Update
taskRoutes.route('/updateCompletion/:id').put(toggleTaskCompletion)
// taskRoutes.route('/update/:id').put(updateTask)

// Delete
taskRoutes.route('/delete/:id').delete(deleteTask)


export default taskRoutes