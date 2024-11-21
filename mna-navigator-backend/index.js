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

const Deal = require('./models/Deal');

app.get('/api/deals', async (req, res) => {
    try {
        const deals = await Deal.find().populate('companyId');
        res.json(deals);
    } catch (error) {
        console.error('Error fetching deals:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/deals', async (req, res) => {
    try {
        const deal = new Deal(req.body);
        await deal.save();
        res.status(201).json(deal);
    } catch (error) {
        console.error('Error creating deal:', error);
        res.status(500).send('Server error');
    }
});

app.put('/api/deals/:id', async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(deal);
    } catch (error) {
        console.error('Error updating deal:', error);
        res.status(500).send('Server error');
    }
});

app.delete('/api/deals/:id', async (req, res) => {
    try {
        await Deal.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting deal:', error);
        res.status(500).send('Server error');
    }
});

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.post('/api/analysis', async (req, res) => {
    try {
        const { document } = req.body;
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Analyze the following document for financial risks, operational challenges, and legal ambiguities:\n\n${document}`,
            max_tokens: 500,
        });
        res.json({ analysis: response.data.choices[0].text });
    } catch (error) {
        console.error('Error during document analysis:', error);
        res.status(500).send('AI analysis failed');
    }
});
