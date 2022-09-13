import bcrypt from "bcryptjs";

const users = [
	{
		name: 'Admin User',
		email: 'admin@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Test User',
		email: 'test@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'John User',
		email: 'john@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
]

export default users;