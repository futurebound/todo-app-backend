import express, { Request, Response } from 'express'
import connectToDB from './db'

const app = express()
const PORT = 3000

// initialize mongoose DB connction
connectToDB()

app.get("/ping", (request: Request, response: Response) => {
   response.send("Pong")
})

app.listen(PORT, () => {
   console.log("server active")
})