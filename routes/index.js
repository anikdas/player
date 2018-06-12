var express = require('express');
var router = express.Router();
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var youtube = require('../services/youtube');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('music_player');
});

function sendStreamToResponse(url, res) {
  var downloadStream = ytdl(url, { filter: youtube.formatChooser });
  res.set({
    'Transfer-Encoding': 'chunked',
    'Content-Type': 'audio/mpeg',
    'Accept-Ranges': 'bytes'
  })

  console.log(typeof(downloadStream));

  var command = ffmpeg(downloadStream)
      .noVideo()
      .audioBitrate(192)
      .toFormat('mp3')
      .on('error', err => {
          console.log(err);
      })
      .output(res)
      .run()
}

router.get('/play', (req, res, next) => {
  
  let url = req.query.url;
  sendStreamToResponse(url, res);

})

module.exports = router;
