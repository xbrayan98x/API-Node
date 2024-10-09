const { Router } =  require('express');

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controller");

const verifyToken = require('../middleware/authMiddleware');
const autorizeRoles = require('../middleware/roleMiddleware');

const router = Router();

router.get( "/", [
  verifyToken,
  autorizeRoles('admin')
], getProjects );

router.post( "/", [
  verifyToken,
  autorizeRoles('admin')
], createProject );

router.put( "/", [
  verifyToken,
  autorizeRoles('admin')
], updateProject );

router.delete( "/", [
  verifyToken,
  autorizeRoles('admin')
], deleteProject );

module.exports = router;