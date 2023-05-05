import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 10,
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 10,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			min: 5,
			max: 30,
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		picturePath: {
			type: String,
			default: '',
		},
		friends: {
			type: Array,
			default: [],
		},
		location: {
			type: String,
			min: 3,
		},
		occupation: {
			type: String,
			min: 3,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
