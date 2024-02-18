import express from 'express'
import { getAllCategories, createCategory, deleteCategory, updateCategory, getCategoryById } from '../controllers/category.contoller'
import authenticationMiddleware from '../middleware/index'

const categoryRoutes = express.Router()

// link up middleware/index.ts for use on routes
categoryRoutes.use(authenticationMiddleware)

categoryRoutes.route('/getAll').get(getAllCategories)
categoryRoutes.route('/get/:id').get(getCategoryById)
categoryRoutes.route('/create').post(createCategory)

// :id coming from category.controller
categoryRoutes.route('/delete/:id').delete(deleteCategory)
categoryRoutes.route('/update/:id').put(updateCategory)

export default categoryRoutes