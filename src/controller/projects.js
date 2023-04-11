const joi = require('joi');
const dbProject = require('../repository/dbProjects');
const dbLogged = require('../repository/dbLogged');
const { validateId } = require('../helpers/helpers');

exports.addProject = async (req, res) => {
  try {
    const { error, value } = joi.object({
      name: joi.string().required().error(new Error('Please enter valid name')),
      cost: joi.number().required().error(new Error('Please enter valid cost')),
      totalMemberCount: joi.number().default(0).error(new Error('Please enter valid member count')),
      startDate: joi.date().required().error(new Error('Please enter valid start date')),
      endDate: joi.date().required().error(new Error('Please enter valid end date')),
    }).validate(req.body);

    if (error) {
      return res.status(400).send({
        error: error.message,
      })
    }

    const { name } = value;
    const isExist = await dbProject.countDocuments({ name });
    if (isExist > 0) {
      return res.status(400).send({
        error: 'This project is already added.'
      })
    }

    await dbProject.create(value);
    return res.status(201).send({
      message: 'Project is added successfully.',
    })

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Internal Server Error',
    })
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectId:_id } = req.params;

    const isValid = validateId(_id);

    if (!isValid) {
      return res.status(400).send({
        error: 'Invalid projectId.'
      });
    }

    const { error, value } = joi.object({
      name: joi.string().error(new Error('Please enter valid name')),
      cost: joi.number().error(new Error('Please enter valid cost')),
      totalMemberCount: joi.number().error(new Error('Please enter valid member count')),
      startDate: joi.date().error(new Error('Please enter valid start date')),
      endDate: joi.date().error(new Error('Please enter valid end date')),
    }).min(1).validate(req.body);

    if (error) {
      return res.status(400).send({
        error: error.message,
      })
    }

    const updatedProject = await dbProject.findOneAndUpdate({ _id }, { $set: value });

    if (!updatedProject) {
      return res.status(404).send({
        error: 'Project not found',
      })
    }

    return res.status(200).send({
      message: 'Project updated successfully.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Internal Server Error',
    })
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectId: _id } = req.params;
    const isValid = validateId(_id);

    if (!isValid) {
      return res.status(400).send({
        error: 'Invalid logId.'
      });
    }

    const deletedProject = await dbProject.findByIdAndDelete(_id);
    if (!deletedProject) {
      return res.status(404).send({
        error: 'LogId not found.',
      });
    }

    await dbLogged.deleteMany({ projectId: _id });
    return res.status(200).send({
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Internal Server Error',
    })
  }
};

exports.getProjects = async (req, res) => {
  try {
    let { pageNo, pageSize } = req.query;
    pageNo = pageNo <= 0 ? 1 : pageNo;
    const limit = pageSize || 10;

    const projectList = await dbProject.findAll(pageNo, limit);
    return res.status(200).send({
      data: projectList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Internal Server Error',
    })
  }
};
