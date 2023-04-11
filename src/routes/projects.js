const router = require('express').Router();
const { authenticate, checkRole } = require('../middleware/authentication');

const {
  addProject,
  updateProject,
  deleteProject,
  getProjects
} = require('../controller/projects');

router.use([authenticate, checkRole]);

router.get('/', getProjects);

router.post('/', addProject);

router.patch('/:projectId', updateProject);

router.delete('/:projectId', deleteProject);

module.exports = router;