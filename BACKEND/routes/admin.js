const express = require('express');
const router = express.Router();
const { overrideSelection } = require('../controllers/adminController');
const authenticateToken = require('../middleware/auth');

router.post('/override/:id', authenticateToken, overrideSelection);

module.exports = router;
