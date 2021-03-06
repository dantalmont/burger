
//dependencies
var express = require('express');
var router = express.Router();

// Import the model
var burger = require('../models/burger.js');

// Create routes
router.get('/', function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      BURGERS: data
    };
    // console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(data) {
    // res.redirect('/');
    res.json({ id: result.insertId });
  });
});

router.put('/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  burger.update({
    devoured: req.body.devoured
  }, condition, function(data) {
    // res.redirect('/');
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;