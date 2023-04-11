const Projects = require('../entity/projects');

exports.findById = (_id) => Projects.findById({ _id });

exports.findOne = (filter) => Projects.findOne(filter);

exports.findOneAndUpdate = (filter, value) => Projects.findOneAndUpdate(filter, value);

exports.create = (value) => Projects.create(value);

exports.countDocuments = (filter) => Projects.countDocuments(filter);

exports.findByIdAndDelete = (_id) => Projects.findByIdAndDelete({ _id });

exports.findAll = (pageNo, limit) => Projects
  .find()
  .skip((pageNo - 1) * limit)
  .limit(limit)
  .sort({ name: 1 })
  .select('name cost totalMemberCount StartDate endDate');
