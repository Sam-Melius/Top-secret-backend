const { Router } = require('express');
const Secret = require('../models/Secret');


module.exports = Router()

  .post('/', async (req, res, next) => {
    try {
      //const { id } = req.user;
      const { title, description } = req.body;
      const post = await Secret.insert({ title, description });
      res.send(post);
    } catch (error) {
      next(error);
    }
  })
;
