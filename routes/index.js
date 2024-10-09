// Routes API

const express = require('express');
const router = express.Router();

const userRoutes = require('./users.routes');
const projectRoutes = require('./projects.routes');
const taskRoutes = require('./tasks.routes');

router.use( '/users', userRoutes );
router.use( '/projects', projectRoutes );
router.use( '/tasks', taskRoutes );

module.exports = router;
