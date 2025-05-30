const express = require('express');
const PHQ9Response = require('../models/ResponseModel');
const User = require('../models/userModel');
const router = express.Router();
const moment = require('moment');


const getSeverity = (score) => {
  if (score <= 4) return 'Minimal depression';
  if (score <= 9) return 'Mild depression';
  if (score <= 14) return 'Moderate depression';
  if (score <= 19) return 'Moderately severe depression';
  return 'Severe depression';
};

// Submit PHQ-9 responses
router.post('/submit', async (req, res) => {
  const { userId, date, responses } = req.body;

  if (!userId || !date || !Array.isArray(responses) || responses.length !== 9) {
    return res.status(400).json({ error: 'Invalid input. Provide userId, date, and 9 responses.' });
  }
  if (!responses.every(val => [0,1,2,3].includes(val))) {
    return res.status(400).json({ error: 'Responses must be 0-3.' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const score = responses.reduce((sum, val) => sum + val, 0);
    const severity = getSeverity(score);

    const phq9Response = new PHQ9Response({ userId, date, responses, score, severity });
    await phq9Response.save();

    res.status(201).json({
      message: 'PHQ-9 responses submitted successfully',
      data: { date, score, severity },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save responses' });
  }
});


router.get('/result/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await PHQ9Response.find({ userId});
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
