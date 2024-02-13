import express from 'express'
import connectToDB from './db'

const app = express()
const PORT = 3000

// initialize mongoose DB connction
connectToDB()

app.get("/ping", (request, response) => {
   response.send("Pong")
})

app.listen(PORT, () => {
   console.log("server active")
})