import { Request, Response } from "express"
import User from "../models/user-model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { IUser } from '../types'


require('dotenv').config()
const authenticationKey = process.env.AUTHENTICATION_KEY
const getUserToken = (_id: string | Types.ObjectId) => {
   const authenticatedUserToken = jwt.sign({_id}, authenticationKey, 
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

      console.log("name: " + name + " email: " + email + " created successfully")
      return response.status(201).send({message: 'user created successfully'})

   } catch (error) {
      console.log('error in user.controller createUser', error)
      throw error
   }
}

export const loginUser = async (request: Request, response: Response) => {
   try {
      // check if user exists in DB
      const { email, password } : IUser = request.body
      const existingUser = await User.findOne({ email })
      if (!existingUser) {
         return response.status(409).send({ message: 'User doesn\'t exist' })
      }

      // check for correct password, and if correct get an authenticated token
      //    and return it as well as the logged in user info in response that can
      //    be used in the front end
      const isSamePassword = await bcrypt.compare(password, existingUser.password)
      if (isSamePassword) {
         const token = getUserToken(existingUser._id)

         console.log("existing user: " + existingUser.name + " email: " + 
               existingUser.email + " logged in successfully")
         return response.send({
            token,
            user: {
               name: existingUser.name,
               email: existingUser.email
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