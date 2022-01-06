var express = require('express');
var router = express.Router();

const { getEmails } = require('../../controllers/api/usersController');

/* endpoints: /api/users */
router 
    .get('/emails',getEmails)
  

module.exports = router;
