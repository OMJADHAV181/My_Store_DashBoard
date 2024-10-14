import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ApiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to enable CORS with the specified frontend URL
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from this frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // List of allowed methods
    credentials: true,  // Allow cookies if needed
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
  }));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test route to verify server is running
app.get('/', (req, res) => {
    res.send({ message: "Hey, welcome to this page!" });
});

// API routes
app.use('/api', ApiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
