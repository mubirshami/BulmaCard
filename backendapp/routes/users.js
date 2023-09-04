var express = require('express');
var router = express.Router();

/*Send the values */
router.post('/', function(req, res, next) {
  const {firstName, lastName, email , image} = req.body;
  const fullName = firstName +' '+ lastName;
  const response = {fullName, image, email}
  res.send(response);
});

module.exports = router;
