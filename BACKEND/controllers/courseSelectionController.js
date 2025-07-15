const pool = require('../db');

// Student selects a course
const submitCourseSelection = async (req, res) => {
  const { id: student_id } = req.user;
  const { course_id } = req.body;

  try {
    // Check for duplicate selection
    const duplicate = await pool.query(
      'SELECT * FROM course_selections WHERE student_id = $1 AND course_id = $2',
      [student_id, course_id]
    );
    if (duplicate.rows.length > 0) {
      return res.status(400).json({ message: 'Course already selected' });
    }

    // Insert selection
    const result = await pool.query(
      'INSERT INTO course_selections (student_id, course_id) VALUES ($1, $2) RETURNING *',
      [student_id, course_id]
    );
    res.status(201).json({ message: 'Course selected', selection: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to select course' });
  }
};

module.exports = { submitCourseSelection };
