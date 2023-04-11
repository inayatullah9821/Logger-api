const router = require('express').Router();
const {
  addProject,
  updateProject,
  deleteProject,
} = require('../controller/projects');

router.post('/', addProject);

router.patch('/', updateProject);

router.delete('/', deleteProject);

module.exports = router;