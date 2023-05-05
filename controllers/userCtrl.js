import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// REGISTER USER
export const register = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(req.body.password, salt);

		const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			friends: req.body.friends,
			password: passwordHash,
			location: req.body.location,
			picture: req.body.picture,
			occupation: req.body.occupation,
		});

		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ msg: 'you are not registered' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'wrong credential' });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;

		res.status(200).json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
