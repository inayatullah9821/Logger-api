const LoggedHours = require('../entity/loggedHours');

exports.findById = (_id) => LoggedHours.findById({ _id });

exports.findOne = (filter) => LoggedHours.findOne(filter);

exports.findOneAndUpdate = (filter, value) => LoggedHours.findOneAndUpdate(filter, value);

exports.create = (value) => LoggedHours.create(value);

exports.countDocuments = (filter) => LoggedHours.countDocuments(filter);

exports.findByIdAndDelete = (_id) => LoggedHours.findByIdAndDelete({ _id });

exports.deleteMany = (filter) => LoggedHours.deleteMany(filter);

exports.findandSortedName = (query, pageNo, limit) => LoggedHours
  .find(query)
  .skip((pageNo - 1) * limit)
  .limit(limit)
  .sort({ name: 1 })
  .select('-createdAt -updatedAt -__v');

exports.findandSortedDate = (query, pageNo, limit) => LoggedHours
  .find(query)
  .skip((pageNo - 1) * limit)
  .limit(limit)
  .sort({ date: 1 })
  .select('-createdAt -updatedAt -__v');
