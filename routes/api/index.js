const router = require('express').Router();
const AudioRoutes = require('./audio');

// Item routes
router.use('/audio', AudioRoutes);
module.exports = router;
