const { body, check } = require('express-validator');

const { validate } = require('../validators/share');
const { User } = require('../models');


const validateRegister = validate([
    body('email')
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value }}).then(user => {
          if (user) {
            return Promise.reject('email already in use');
          }
        })
      }),
    check('username')
      .not()
      .isEmpty()
      .withMessage('must not empty')
      .custom((value, { req }) => {
        return User.findOne({ where: { username: value }}).then(user => {
          if (user) {
            return Promise.reject('username already in use');
          }
        })
      }),
    check('password')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage('wrong format'),
    check('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true
      }),
  ])

const validateLogin = validate([
  check('username').notEmpty(),
  check('password').notEmpty()
])

const validateUpdateProfile = validate([
  check('firstName').notEmpty(),
  check('lastName').notEmpty()
])

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile
}