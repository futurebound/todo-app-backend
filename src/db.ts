import mongoose from 'mongoose'


require('dotenv').config()
const dbUser = process.env.MONGODB_USER
const dbPassword = process.env.MONGODB_PASSWORD
const dbCluster = process.env.MONGODB_CLUSTER


const connectToDB = async () => {
   try {
      const connectionString = "mongodb+srv://" + dbUser + ":" 
            + dbPassword + "@" + dbCluster 
            + ".rzprfl2.mongodb.net/todo-app?retryWrites=true&w=majority"
      const connection = await mongoose.connect(connectionString)

      // confirm positive connection in console
      if (connection) console.log('connected to mongoose')

   } catch (error) {
      console.log('error in connectToDB', error)
      throw error
   }
}

export default connectToDB