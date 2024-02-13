import { Request, Response } from "express"
import User from "../models/user-model"
import bcrypt from 'bcrypt'

const createUser = async (request: Request, response: Response) => {
   try {
      const {name, email, password} = request.body

      const existingUser = await User.find({email})
      if (existingUser) return response.status(409).send('user aleady exists')

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await User.create({
         name,
         email,
         hashedPassword
      })

      return response.status(201).send({message: 'user created successfully'})

   } catch (error) {
      console.log('error in user.controller createUser', error)
      throw error
   }
}

export default createUser