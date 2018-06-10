var express = require('express');
var router = express.Router();
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/play', (req, res, next) => {
  let url = req.query.url;
  var downloadStream = ytdl(url, { filter: (format) => format.container === 'mp4' });
  res.set({
    'Transfer-Encoding': 'chunked',
    'Content-Type': 'audio/mpeg',
    'Accept-Ranges': 'bytes'
  })
  var command = ffmpeg(downloadStream)
      .noVideo()
      .audioBitrate(192)
      .toFormat('mp3')
      .on('progress', (progress) => {
          console.log(progress);
      })
      .on('error', err => {
          console.log(err);
      })
      .output(res)
      .output('file.mp3')
      .run()
})

module.exports = router;
