const joi = require('joi');
const { model, default: mongoose } = require('mongoose');
const { validateId } = require('../helpers/helpers');
const dbUser = require('../repository/dbUsers');
const dbProject = require('../repository/dbProjects');
const dbLogged = require('../repository/dbLogged');
const LoggedHour = require('../entity/loggedHours');

//create user
exports.createUser = async (req, res) => {
  try {
    const { error, value } = joi.object({
      name: joi.string()
        .required()
        .pattern(/^[a-zA-Z\s]+$/)
        .error(new Error('Please enter valid name')),
      email: joi.string()
        .email()
        .required()
        .error(new Error('Please enter valid email')),
      password: joi.string()
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .error(new Error('Password must contain atleast one lowercase, uppercase, one number and a special character')),
      role: joi.string().valid('user', 'admin').error(new Error('Role must be either user or admin')),
      projectId: joi.string().error(new Error('Please enter valid project Id.')),
    }).validate(req.body);


    if (error) {
      return res.status(400).send({
        error: error.message,
      })
    }

    const { name, email, password, role, projectId } = value;

    const userExist = await dbUser.countDocuments({ email });

    if (userExist > 0) return res.status(400).send({
      error: 'User is already registered',
    });

    const isValid = validateId(projectId);

    if (!isValid) {
      return res.status(400).send({
        error: 'Invalid projectId.'
      });
    }

    const project = await dbProject.findOneAndUpdate({ _id: projectId }, { $inc: { totalMemberCount: 1 } });
    if (!project) {
      return res.status(404).send({
        error: 'Project not found',
      });
    }

    await dbUser.create({
      name,
      email,
      password,
      role,
      projects: [projectId],
    });

    return res.status(200).send('You have registered Successfully Thanks!');
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Internal Server Error',
    })
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId: _id } = req.params;
    const validId = validateId(userId);
    if (!validId) {
      return res.status(400).send({ message: 'Invalid userId' });
    }

    const deletedUser = await dbUser.findByIdAndDelete(_id);
    if (!deletedUser) {
      return res.status(404).send({
        error: `User with id ${id} not found`,
      })
    }
    return res.status(200).send({
      message: `User with id ${userId} deleted Successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

//  see log data by filter and pagination
exports.getLoggedHours = async (req, res) => {
  try {
    const { projectId, startDate, endDate, pageNo = 1, limit = 10 } = req.query;


    const query = {};
    if (projectId) {
      query.projectId = new mongoose.Types.ObjectId(projectId);
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }

    const data = await dbLogged.findandSortedDate(query, pageNo, limit);

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
      data,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: 'Internal Server Error',
    });
  }
}