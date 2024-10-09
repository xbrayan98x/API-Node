const { Router } =  require('express');

const { 
    createTask,
    getTasks,
    updateTask,
} = require("../controllers/tasks.controller");

const { 
  validateCreate
} = require('../validators/tasks.js');

const verifyToken = require('../middleware/authMiddleware');
const autorizeRoles = require('../middleware/roleMiddleware');

const router = Router();

router.get( "/", [
  verifyToken,
  autorizeRoles('admin', 'usuario')
], getTasks );

router.post( "/", [
  verifyToken,
  autorizeRoles('admin', 'usuario'),
  validateCreate
], createTask );

router.patch( "/:id", [
  verifyToken,
  autorizeRoles('admin', 'usuario')
], updateTask );

module.exports = router;