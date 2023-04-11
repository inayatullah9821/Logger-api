const Projects = require('../entity/projects');

exports.findById = (_id) => Projects.findById({ _id });

exports.findOne = (filter) => Projects.findOne(filter);

exports.findOneAndUpdate = (filter, value) => Projects.findOneAndUpdate(filter, value);

exports.create = (value) => Projects.create(value);

exports.countDocuments = (filter) => Projects.countDocuments(filter);

exports.findByIdAndDelete = (_id) => Projects.findByIdAndDelete({ _id });
