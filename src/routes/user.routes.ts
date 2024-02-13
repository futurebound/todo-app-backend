import express from 'express'
import { createUser } from '../controllers/user.controller'

const userRoutes = express.Router()

userRoutes.route('/create').post(createUser)

export default userRoutes