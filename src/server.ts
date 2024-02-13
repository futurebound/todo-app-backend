import express, { Request, Response } from 'express'
import connectToDB from './db'
import userRoutes from './routes/user.routes'
import categoryRoutes from './routes/category.routes'
import taskRoutes from './routes/task.routes'

const app = express()
app.use(express.json())
const PORT = 3000

// initialize mongoose DB connction
connectToDB()

// what usage would look like if doing all routes local to this file
app.get("/ping", (request: Request, response: Response) => {
   response.send("Pong")
})

// register routes -> from any routes/ directory files
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/task', taskRoutes)

// start the server
app.listen(PORT, () => {
   console.log("server active")
})