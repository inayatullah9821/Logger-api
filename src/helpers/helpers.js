const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.generateToken = async (data) => jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.validateId = (id) => (mongoose.Types.ObjectId.isValid(id));
