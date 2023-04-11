const mongoose = require('mongoose');
const joi = require('joi');
const dbLogged = require('../repository/dbLogged');
const dbProjects = require('../repository/dbProjects');
const { validateId } = require('../helpers/helpers');
const LoggedHour = require('../entity/loggedHours');

//  log hours
exports.logHours = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;
    const isValid = validateId(projectId);

    if (!isValid) {
      return res.status(400).send({
        error: 'Invalid projectId.',
      });
    }

    const projectExist = await dbProjects.countDocuments({ _id: projectId });
    if (projectExist <= 0) {
      return res.status(404).send({
        message: 'Project not found.',
      })
    }
    const { error, value } = joi.object({
      date: joi.date().required().error(new Error('Please enter valid date')),
      hours: joi.number().required().error(new Error('Please enter valid hours')),
      billable: joi.boolean().required().error(new Error('Either it should be true or false')),
    }).validate(req.body);

    if (error) {
      return res.status(400).send({
        error: error.message,
      })
    }

    const { date, hours, billable } = value;

    await dbLogged.create({
      userId,
      projectId,
      date,
      hours,
      billable,
    });

    return res.status(201).send({
      message: 'Log hours added successfully.',
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Internal Server Error',
    })
  }
};

//  update hours
exports.updateLogHours = async (req, res) => {
  try {
    const { logId: _id } = req.params;
    const isValid = validateId(_id);

    if (!isValid) {
      return res.status(400).send({
        error: 'Invalid logId.'
      });
    }

    const { error, value } = joi.object({
      date: joi.date().error(new Error('Please enter valid date')),
      hours: joi.number().error(new Error('Please enter valid hours')),
      billable: joi.boolean().error(new Error('Either it should be true or false')),
    }).min(1).validate(req.body);

    if (error) {
      return res.status(400).send({
        error: error.message,
      })
    }

    const updatedLogged = await dbLogged.findOneAndUpdate({ _id }, { $set: value });
    if (!updatedLogged) {
      return res.status(404).send({
        error: 'LogId not found.',
      });
    }

    return res.status(200).send({
      message: 'Log Hours updated successfully.',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Internal Server Error',
    })
  }
};

//  delete hours
exports.deleteLogHours = async (req, res) => {
  try {
    const { logId: _id } = req.params;
    const isValid = validateId(_id);

    if (!isValid) {
      return res.status(400).send({
        error: 'Invalid logId.'
      });
    }

    const deletedLogged = await dbLogged.findByIdAndDelete(_id);
    if (!deletedLogged) {
      return res.status(404).send({
        error: 'LogId not found.',
      });
    }

    return res.status(200).send({
      message: 'Log Hours deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Internal Server Error',
    })
  }
};

//  see log data by filter and pagination
exports.logData = async (req, res) => {
  try {
    let { projectId, startDate, endDate, pageNo, pageSize } = req.query;
    const userId = req.user._id;
    pageNo = pageNo <= 0 ? 1 : pageNo;
    const limit = pageSize || 10;
    const query = {};
    query.userId = new mongoose.Types.ObjectId(userId);

    if (projectId) {
      query.projectId = new mongoose.Types.ObjectId(projectId);
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const loggedData = await dbLogged.findandSortedName(query, pageNo, limit);

    const totalHours = await LoggedHour.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$hours' } } },
    ])

    const totalBillable = await LoggedHour.aggregate([
      { $match: { ...query, billable: true } },
      { $group: { _id: null, total: { $sum: '$hours' } } },
    ]);
    const totalNonBillable = await LoggedHour.aggregate([
      { $match: { ...query, billable: false } },
      { $group: { _id: null, total: { $sum: '$hours' } } },
    ]);

    return res.status(200).send({
      totalHours,
      totalBillable,
      totalNonBillable,
      data: loggedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Internal Server Error',
    })
  }
};
