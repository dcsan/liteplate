'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let opts = {
    videoUrl: "http://video.ted.com/talk/stream/2010S/None/MartinJacques_2010S-950k.mp4"
  };
  res.render('video/video', opts );
});

module.exports = router;
