import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// REGISTER USER
export const register = async (req, res) => {
	try {
		// const user = ({
		// 	firstName,
		// 	lastName,
		// 	email,
		// 	friends,
		// 	password,
		// 	location,
		// 	picturePath,
		// 	occupation,
		// } = req.body);

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(req.body.password, salt);

		const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			friends: req.body.friends,
			password: passwordHash,
			location: req.body.location,
			picturePath: req.body.picturePath,
			occupation: req.body.occupation,
		});

		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
