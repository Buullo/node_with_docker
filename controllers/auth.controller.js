const { compareSync, hashSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { jwtSecret } = require('../config')
const sendEmail = require('../services/mailer.service')

const register = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body
  const saltRounds = 10;

  try {
    const hashPassword = hashSync(password, saltRounds);

    const user = await User.create({ 
      firstName, lastName, email, username, hashPassword });

    sendEmail({
      from: 'server@mail.co', 
      to: email, 
      subject: 'Test Email', 
      html: `<h1>Resgister completed with email: ${email}</h1>`
    })

    res.json({ user: user.toJSON() });
  } catch (error) {
    res.status(500).send('Server Error')
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ where: { username }})
    
    if (!user) res.status(400).send({ error: 'Not Found username' });

    const isValid = compareSync(password, user.hashPassword);

    if (isValid) {
      const token = jwt.sign({
        userId: user.id,
        email: user.email
      }, jwtSecret, { expiresIn: 60 * 60 }); // 1h

      res.json({ token });
    } else {
      res.status(400).send({ error: 'Wrong Password' });
    }
  } catch (err) {
    res.status(500).send({ error: 'Server Error' })
  }
}

const getInfo = async (req, res) => {
  res.json({ 
    data: {
      userId: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    } 
  })
}

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body

    const user = await req.user.update({ firstName, lastName });

    res.json({ 
      data: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      } 
    })
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

module.exports = {
  register,
  login,
  getInfo,
  updateProfile
}