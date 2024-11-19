const connectDB = require('./db');
const Company = require('./models/Company');

connectDB();

const seedCompanies = async () => {
    try {
        // Clear existing data
        await Company.deleteMany();

        // Insert sample data
        await Company.create([
            {
                name: 'Acme Corp',
                industry: 'Technology',
                revenue: 10000000,
                employees: 500,
                description: 'Leading tech solutions provider',
            },
            {
                name: 'Healthify',
                industry: 'Healthcare',
                revenue: 2000000,
                employees: 100,
                description: 'Innovative healthcare startup',
            },
        ]);

        console.log('Sample companies seeded successfully!');
        process.exit(); // Exit the process
    } catch (err) {
        console.error('Error seeding companies:', err);
        process.exit(1); // Exit the process with failure
    }
};

seedCompanies();
