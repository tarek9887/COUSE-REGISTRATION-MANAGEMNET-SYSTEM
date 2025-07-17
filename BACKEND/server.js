const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course'); // ✅ Move this up (good practice)
const courseSelectionRoutes = require('./routes/selection');
const advisorRoutes = require('./routes/advisor');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes); // ✅ This is correct!
app.use('/api/selection', courseSelectionRoutes);
app.use('/advisor', advisorRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




