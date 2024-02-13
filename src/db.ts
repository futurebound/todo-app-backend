import mongoose from 'mongoose'

const connectionString = 
   "mongodb+srv://mmdev:AEjVDXJPuIe6tx97@cluster0.rzprfl2.mongodb.net/?retryWrites=true&w=majority"

const connectToDB = async () => {
   try {
      const connection = await mongoose.connect(connectionString)
      if (connection) console.log('connected to mongoose')
   } catch (error) {
      console.log('error in connectToDB', error)
      throw error
   }
}

export default connectToDB