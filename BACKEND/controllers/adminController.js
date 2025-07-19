const pool = require('../db');

// Admin override to confirm course selection
const overrideSelection = async (req, res) => {
  const { role_id } = req.user;
  if (role_id !== 1) return res.status(403).json({ message: 'Admins only' });

  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE course_selections SET status = $1 WHERE id = $2 RETURNING *',
      ['confirmed', id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Course selection not found' });
    }

    res.json({ message: 'Selection confirmed by admin', selection: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to override selection' });
  }
};

module.exports = { overrideSelection };
