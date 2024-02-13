import { Response } from "express"
import { AuthRequest } from "../middleware"
import Task from "../models/task-model"
import { ITask } from "../types"


/**
 * Returns all the tasks of the logged in user.
 */
export const getAllTasks = async (request: AuthRequest, response: Response) => {
   try {
      const userId = request.user

      const tasks = await Task.find({
         user: userId,
      })
      return response.send(tasks)

   } catch (error) {
      console.log('error in task.controller getAllTasks()', error)
      response.send({ error: "something went wrong retreiving all tasks" })
      throw (error)
   }
}

/**
 * Returns all the Tasks of a specific Category for the logged in User.
 */
export const getAllTasksByCategory = async (request: AuthRequest, response: Response) => {
   try {
      const userId = request.user
      const categoryId = request.params

      const tasks = await Task.find({
         user: userId,
         categoryId: categoryId
      })
      return response.send(tasks)

   } catch (error) {
      console.log('error in task.controller getAllTasksByCategory()', error)
      response.send({ error: "something went wrong retreiving tasks for this category" })
      throw (error)
   }
}

/**
 * Creates a new Task DB item for the logged in user in given Category.
 */
export const createTask = async (request: AuthRequest, response: Response) => {
   try {
      const userId = request.user
      const { name, categoryId, date  } : ITask = request.body

      const task = await Task.create({
         name: name, 
         user: userId, 
         categoryId: categoryId,
         date: date
      })

      // return response to front end
      response.send(task)

   } catch (error) {
      console.log('error in task.controller createTask()', error)
      response.send({ error: "something went wrong creating task" })
      throw (error)
   }
}


export const toggleTaskCompletion = async (request: AuthRequest, response: Response) => {
   try {
      // get task.id from the front end in AuthRequest body
      const { id } = request.params

      // going to just take whatever the front-end gives us to update with
      const { isCompleted } = request.body

      const task = await Task.updateOne(
         { _id: id },
         { isCompleted: isCompleted}
      )
      response.send(task)

   } catch (error) {
      console.log('error in task.controller toggleTaskCompletion()', error)
      response.send({ error: "something went wrong toggling task completion status" })
      throw (error)
   }
}


/**
 * Deletes a given Task from the given Category for the authenticated User.
 */
export const deleteTask = async (request: AuthRequest, response: Response) => {
   try {
      // get task.id from the front end in AuthRequest body
      const { id } = request.params
      await Task.deleteOne({ _id: id })
      response.send({ message: 'Task deleted'})

   } catch (error) {
      console.log('error in task.controller deleteTast()', error)
      response.send({ error: "something went wrong deleting task" })
      throw (error)
   }
}