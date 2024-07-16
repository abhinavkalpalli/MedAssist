import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import bodyParser from 'body-parser';
import { join } from 'path';
import { patientRoutes } from './routes/patientRoutes';
import { doctorRoutes } from './routes/doctorRoutes';
import { adminRoutes } from './routes/adminRoutes';
import { authRoutes } from './routes/authRouter';


dotenv.config({ path: join('./src', '.env') });
const app = express();
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], credentials: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbUrl: string = process.env.DB_URL || " ";
const port: number = parseInt(process.env.PORT || "3200");

app.use('/api/patient',patientRoutes)
app.use('/api/doctor',doctorRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/auth',authRoutes)

mongoose.connect(dbUrl)
    .then(() => {
        console.log('Database connected..');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
