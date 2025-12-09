const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// @route   POST api/payments
// @desc    Process payment
// @access  Private
router.post('/', auth, processPayment);

module.exports = router;
