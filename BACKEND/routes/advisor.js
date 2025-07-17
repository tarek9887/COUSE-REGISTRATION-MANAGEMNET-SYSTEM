const express = require('express');
const router = express.Router();
const advisorController = require('../controllers/advisorController');
const authMiddleware = require('../middleware/auth');

// Middleware: Only advisors (role_id === 2) can access
router.use(authMiddleware); // protect all advisor routes

router.get('/selections', advisorController.getPendingSelections);
router.post('/selections/:id/approve', advisorController.approveSelection);
router.post('/selections/:id/reject', advisorController.rejectSelection);

module.exports = router;
