const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Company = require('./models/Company');


const app = express();
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Test Route
app.get('/', (req, res) => {
    res.send('M&A Navigator Backend with MongoDB is running!');
});

// Fetch all companies
app.get('/api/companies', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
