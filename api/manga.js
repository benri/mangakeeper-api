var models = require('../models');
var express = require('express');
var router  = express.Router();

// on routes that end in /manga
// ----------------------------------------------------

// create a manga (accessed at POST http://localhost:8080/api/manga)
router.post('/', function(req, res) {
  // save the manga and check for errors
  models.manga.create({
    name: req.body.name
  }).then(function(val) {
    console.log('POST api/manga/');
    res.json({ message: 'Manga created!' });
  }, function(err) {
    if (err) {
      res.send(err);
    }
  });
});

// get all the manga (accessed at GET http://localhost:8080/api/manga)
router.get('/', function(req, res) {
  models.manga.findAll().then(function(manga) {
    console.log('GET api/manga/');
    res.json({
      manga: manga
    });
  }, function(err) {
    if (err) {
      res.send(err);
    }
  });
});

// on routes that end in /manga/:manga_id
// ----------------------------------------------------

// get the manga with that id (accessed at GET http://localhost:8080/api/manga/:manga_id)
router.get('/:manga_id', function(req, res) {
  models.manga.findById(req.params.manga_id)
    .then(function(manga) {
      console.log('GET api/manga/' + req.params.manga_id);
      res.json(manga);
    }, function(err) {
      if (err) {
        res.send(err);
      }
    });
});

// update the manga with this id (accessed at PUT http://localhost:8080/api/manga/:manga_id)
router.put('/:manga_id', function(req, res) {
  models.manga.findById(req.params.manga_id)
    .then(function(manga) {
      manga.name = req.body.name;

      manga.update({
        name: req.body.name
      }).then(function(val) {
        console.log('PUT api/manga/' + req.params.manga_id);
        res.json({
          message: "Manga updated!"
        });
      }, function(err) {
        if (err) {
          res.send(err);
        }
      });

    }, function(err) {
      if (err) {
        res.send(err);
      }
    });
})

// delete the manga with this id (accessed at DELETE http://localhost:8080/api/manga/:manga_id)
router.delete('/:manga_id', function(req, res) {
  models.manga.destroy({
    where: {
      id: req.params.manga_id
    }
  }).then(function() {
    console.log("DELETE api/manga/" + req.params.manga_id);
    res.json({
      message: "Successfully deleted"
    });
  }, function(err) {
    if (err) {
      res.send(err);
    }
  });
});

module.exports = router;
