import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user-model'

require('dotenv').config()
const authenticationKey = process.env.AUTHENTICATION_KEY

export interface AuthRequest extends Request {
   user: string
}

const authenticationMiddleware = async (
   request: AuthRequest, 
   response: Response,
   next: NextFunction  
) => {
   try {
      const {authorization} = request.headers
      if (!authorization) {
         return response.status(401).json({
            error: 'Authorization required'
         })
      }

      const token = authorization
      const { _id } = jwt.verify(token, authenticationKey)
      const existingUser = await User.findOne({ _id })

      // CORE: when hitting API for category, task, etc. will need it to be with
      //    a given user. won't be passing userID in body of the response to those
      //    so need to extract it this way taking _id from authenticated user token
      //    and then attach it to the request so we can find all Category or Task
      //    for that given user
      if (existingUser) {
         request.user = existingUser.id
      }
      next()

   } catch (error) {
      console.log('error in authenticationMiddleware', error)
      throw error
   }
}

export default authenticationMiddleware