import mongoose from 'mongoose'

const connectToDB = async () => {
   try {
      const connectionString = 
   "mongodb+srv://mmdev:dCGbdrMyVaY6VeRl@cluster0.rzprfl2.mongodb.net/todo-app?retryWrites=true&w=majority"
      const connection = await mongoose.connect(connectionString)
      if (connection) console.log('connected to mongoose')
   } catch (error) {
      console.log('error in connectToDB', error)
      throw error
   }
}

export default connectToDB