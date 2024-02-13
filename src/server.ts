import express, { Request, Response } from 'express'
import connectToDB from './db'
import userRoutes from './routes/user.routes'

const app = express()
app.use(express.json())
const PORT = 3000

// initialize mongoose DB connction
connectToDB()

app.get("/ping", (request: Request, response: Response) => {
   response.send("Pong")
})

// register routes
app.use('/user', userRoutes)

app.listen(PORT, () => {
   console.log("server active")
})