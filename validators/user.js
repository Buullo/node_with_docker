const { body, check } = require('express-validator');
const { validate } = require('../validators/share')

const validatorCreate = validate([
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('must not empty'),
    check('lastName')
      .not()
      .isEmpty()
      .withMessage('must not empty'),
    body('email').isEmail()
  ])

const validatorUpdate = validate([
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('must not empty'),
    check('lastName')
      .not()
      .isEmpty()
      .withMessage('must not empty'),
  ])

module.exports = {
  validatorCreate,
  validatorUpdate
}