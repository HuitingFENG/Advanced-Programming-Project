const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

let users = [];

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

const User = require('../models/User'); // assuming you have a User model defined

router.post('/login', async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user == null) {
    return res.status(400).json({ error: 'Cannot find user' });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.json({ message: 'Success', user: user }); // send back the user object
    } else {
      res.status(400).json({ error: 'Not Allowed' });
    }
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;