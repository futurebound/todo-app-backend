import { Request, Response } from "express"
import User from "../models/user-model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import IUser from '../types'


require('dotenv').config()
const authenticatedKey = process.env.AUTHENTICATION_KEY
const getUserToken = (_id:string | Types.ObjectId) => {
   const authenticatedUserToken = jwt.sign({_id}, authenticatedKey, 
         {expiresIn:'7d'})
   
   return authenticatedUserToken
}

export const createUser = async (request: Request, response: Response) => {
   try {
      const {name, email, password} = request.body

      const existingUser = await User.findOne({email})
      if (existingUser) {
         return response.status(409).send('user aleady exists')
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await User.create({
         name: name,
         email: email,
         password: hashedPassword
      })

      return response.status(201).send({message: 'user created successfully'})

   } catch (error) {
      console.log('error in user.controller createUser', error)
      throw error
   }
}

export const loginUser = async (request: Request, response: Response) => {
   try {
      const { email, password } : IUser = request.body
      const existingUser = await User.findOne({ email })
      if (!existingUser) {
         return response.status(409).send({ message: 'User doesn\'t exist' })
      }

      const isSamePassword = await bcrypt.compare(password, existingUser.password)
      if (isSamePassword) {
         const token = getUserToken(existingUser._id)
         return response.send({
            token,
            user: {
               email: existingUser.email,
               name: existingUser.name
            }
         })
      } else {
         return response.status(400).send({message: 'Invalid login info'})
      }

   } catch (error) {
      console.log('error in user.controller loginUser', error)
      throw error
   }
}

// export default createUser