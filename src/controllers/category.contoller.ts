import { Request, Response } from "express"
import Category from "../models/category-model"
import { ICategory } from "../types"
import { AuthRequest } from "../middleware"


/**
 * Returns all the categories of the logged in user.
 */
export const getAllCategories = async (request: AuthRequest, response: Response) => {
   try {
      const { user } = request

      const categories = await Category.find({
         user: user,
      })
      return response.send(categories)
      
   } catch (error) {
      console.log('error in category.controller getAllCategories()', error)
      response.send({ error: "something went wrong" })
      throw (error)
   }
}

/**
 * Creates a new Category DB item for the logged in user.
 */
export const createCategory = async (request: AuthRequest, response: Response) => {
   try {
      const { color, icon, isEditable, name } : ICategory = request.body
      // note: user here is a string, but mongoose smart enough to recognize
      //       with the "User" from schema and will use ObjectID instead
      const { user } = request

      const category = await Category.create({
         color, icon, isEditable, name, user
      })

      // return response to front end
      response.send(category)

   } catch (error) {
      console.log('error in category.controller createCategory()', error)
      response.send({ error: "something went wrong" })
      throw (error)
   }
}