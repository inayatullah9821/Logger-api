const router = require('express').Router();
const {
  addProject,
  updateProject,
  deleteProject,
} = require('../controller/projects');

router.post('/', addProject);

router.patch('/:projectId', updateProject);

router.delete('/:projectId', deleteProject);

module.exports = router;