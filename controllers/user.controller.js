const { User } = require('../models');

const create = async (req, res) => {
  const { firstName, lastName, email } = req.body

  try {
    const user = await User.create({ firstName, lastName, email });
    res.json({ user: user.toJSON() });
  } catch (error) {
    res.status(400).send(error)
  }
}

const getList = async (req, res) => {
  const users = await User.findAll({attributes: ['id', 'firstName', 'lastName']});
  res.json({ users });
}

const update = async (req, res) => {
  const { firstName, lastName } = req.body

  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }})

    if (!user) throw { message: 'not found' }

    await user.update({ firstName, lastName });

    res.json({ user: user.toJSON() });
  } catch (error) {
    res.status(400).send(error)
  }
}

module.exports = {
  create,
  getList,
  update
}