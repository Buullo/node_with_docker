const express = require('express');

const router = express.Router();

const { create, getList, update } = require('../controllers/user.controller')
const { validatorCreate, validatorUpdate } = require('../validators/user')

/* GET users listing. */
router.get('/', getList);

/* POST users listing. */
router.post('/', validatorCreate, create);

/* PUT users listing. */
router.put('/:id', validatorUpdate, update);

module.exports = router;
