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
      console.log("retreived all categories for user: " + user)
      return response.send(categories)

   } catch (error) {
      console.log('error in category.controller getAllCategories()', error)
      response.send({ error: "something went wrong retreiving all categories" })
      throw (error)
   }
}

export const getCategoryById = async (request: AuthRequest, response: Response) => {
   try {
      const { user } = request
      const { id } = request.params
      const category = await Category.findOne({
        _id: id
      })

      console.log("retreived category: " + category)
      return response.send(category)

   } catch (error) {
      console.log('error in category.controller getAllCategories()', error)
      response.send({ error: "something went wrong retreiving all categories" })
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
      console.log(`user: ${user} created new category: ${category}`)
      response.send(category)

   } catch (error) {
      console.log('error in category.controller createCategory()', error)
      response.send({ error: "something went wrong creating category" })
      throw (error)
   }
}

export const deleteCategory = async (request: AuthRequest, response: Response) => {
   try {
      // get category.id from the front end in AuthRequest body
      const { id } = request.params
      await Category.deleteMany({ _id: id })

      console.log(`deleted category: ${id}`)
      response.send({ message: 'Category deleted'})

   } catch (error) {
      console.log('error in category.controller deleteCategory()', error)
      response.send({ error: "something went wrong deleting category" })
      throw (error)
   }
}

export const updateCategory = async (request: AuthRequest, response: Response) => {
   try {
      // get category.id from the front end in AuthRequest body
      const { id } = request.params
      const { color, icon, isEditable, name } : ICategory = request.body
      await Category.updateOne(
         {
            _id: id
         },
         {
            $set: {
               name, color, icon, isEditable
            }
         }
      )

      // return response to front end
      console.log(`updated category: ${id}`)
      response.send({ message: "Category updated" })

   } catch (error) {
      console.log('error in category.controller updateCategory()', error)
      response.send({ error: "something went wrong updating category" })
      throw (error)
   }
}