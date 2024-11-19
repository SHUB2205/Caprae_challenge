const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    dealValue: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Deal', DealSchema);
