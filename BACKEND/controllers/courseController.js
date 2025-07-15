const pool = require('../db');

// Admin-only: Create a new course
const createCourse = async (req, res) => {
  const { role_id } = req.user;
  if (role_id !== 1) return res.status(403).json({ message: 'Access denied. Admins only.' });

  const { code, title, department, credit, capacity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO courses (code, title, department, credit, capacity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [code, title, department, credit, capacity]
    );
    res.status(201).json({ message: 'Course created', course: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating course' });
  }
};

// All users: Get list of courses
const getCourses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses');
    res.status(200).json({ courses: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

module.exports = {
  createCourse,
  getCourses, // <-- include in exports
};
