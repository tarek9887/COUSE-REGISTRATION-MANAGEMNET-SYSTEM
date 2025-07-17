const pool = require('../db');

// Only pending selections should be shown to advisor
const getPendingSelections = async (req, res) => {
  const { role_id } = req.user;
  if (role_id !== 2) return res.status(403).json({ message: 'Access denied. Advisors only.' });

  try {
    const result = await pool.query(`
      SELECT cs.*, s.name AS student_name, c.title AS course_title
      FROM course_selections cs
      JOIN students s ON cs.student_id = s.id
      JOIN courses c ON cs.course_id = c.id
      WHERE cs.status = 'pending'
    `);
    res.status(200).json({ selections: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch pending selections' });
  }
};

const approveSelection = async (req, res) => {
  const { role_id } = req.user;
  if (role_id !== 2) return res.status(403).json({ message: 'Access denied. Advisors only.' });

  const selectionId = req.params.id;
  try {
    const result = await pool.query(
      `UPDATE course_selections SET status = 'approved' WHERE id = $1 RETURNING *`,
      [selectionId]
    );
    res.status(200).json({ message: 'Selection approved', selection: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to approve selection' });
  }
};

const rejectSelection = async (req, res) => {
  const { role_id } = req.user;
  if (role_id !== 2) return res.status(403).json({ message: 'Access denied. Advisors only.' });

  const selectionId = req.params.id;
  try {
    const result = await pool.query(
      `UPDATE course_selections SET status = 'rejected' WHERE id = $1 RETURNING *`,
      [selectionId]
    );
    res.status(200).json({ message: 'Selection rejected', selection: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to reject selection' });
  }
};

module.exports = {
  getPendingSelections,
  approveSelection,
  rejectSelection,
};
