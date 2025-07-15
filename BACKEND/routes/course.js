const express = require('express');
const router = express.Router();

const { createCourse, getCourses } = require('../controllers/courseController');
const authenticate = require('../middleware/auth');

// ✅ Admin-only route to create course
router.post('/create', authenticate, createCourse);

// ✅ All authenticated users can view courses
router.get('/', authenticate, getCourses);

module.exports = router;
