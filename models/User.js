const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model('User', UsersSchema);