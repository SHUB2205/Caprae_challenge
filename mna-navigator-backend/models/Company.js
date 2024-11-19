const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    industry: { type: String },
    revenue: { type: Number },
    employees: { type: Number },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Company', CompanySchema);
