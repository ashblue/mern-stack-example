const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User
      .findById(req.user.id)
      .select('-password');

    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
      const dbUser = await User.findOne({email});

      if (!dbUser) {
        return res.status(400)
          .json({errors: [{msg: 'Invalid Credentials'}]});
      }

      const isMatch = await bcrypt.compare(password, dbUser.password);
      if (!isMatch) {
        return res.status(400)
          .json({errors: [{msg: 'Invalid Credentials'}]});
      }

      const payload = {
        user: {
          id: dbUser.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
