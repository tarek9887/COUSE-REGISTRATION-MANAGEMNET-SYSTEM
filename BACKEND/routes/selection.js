const express = require('express');
const router = express.Router();
const { submitCourseSelection } = require('../controllers/courseSelectionController');
const authenticate = require('../middleware/auth');

// Only students (role_id = 2) can select
router.post('/submit', authenticate, submitCourseSelection);

module.exports = router;
