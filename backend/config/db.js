import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})

		console.log(`MongoDB connection successful: ${conn.connection.host}`.cyan)
	} catch (error){
		console.log(`Error: ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}

export default connectDB;