import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/userCtrl.js';
import userRoute from './routes/userRoute.js';

// CONFIGURATION
dotenv.config();
const app = express();
const port = process.env.PORT || 5050;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('common'));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/assets');
	},

	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/api/register", upload.single("picture"), register);

// ROUTES
app.use('/api', userRoute);

// CONNECTION
mongoose
	.connect(process.env.MONGO_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		app.listen(port, () => {
			console.log(`serving @ http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.log(`${error?.message}, not connected.`);
	});
