const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { jwtSecret } = require('../config')

const authenticate = async (req, res, next) => {
  const bearerToken = req.get('Authorization')
  
  if (bearerToken) {
    try {
      const jwtToken = bearerToken.replace("Bearer ", "")
      const decoded = jwt.verify(jwtToken, jwtSecret)

      const user = await User.findOne({where: { id: decoded.userId } })

      if (user) {
        req.user = user
        next()
      } else {
        res.status(401).send({ error: 'Token Invalid' })
      }
    } catch(err) {
      res.status(401).send({ error: 'Token Expired' })
    }
  } else {
    res.status(401).send({ error: 'Unauthorize' })
  }
}

module.exports = {
  authenticate
}