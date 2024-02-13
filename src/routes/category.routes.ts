import express from 'express'
import { getAllCategories, createCategory } from '../controllers/category.contoller'
import authenticationMiddleware from '../middleware/index'

const categoryRoutes = express.Router()

categoryRoutes.use(authenticationMiddleware)

categoryRoutes.route("/").get(getAllCategories)
categoryRoutes.route("/").post(createCategory)

export default categoryRoutes