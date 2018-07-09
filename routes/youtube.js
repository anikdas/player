const express = require('express');
const router = express.Router();
const request = require('request-promise');

const _ = require('lodash');


/* GET home page. */
router.get('/search', function(req, res, next) {
    const options = { 
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        qs: 
        {
            q: req.query.q,
            maxResults: '25',
            part: 'snippet',
            key: process.env.YT_SEARCH_API_KEY,
            type: 'video'
        }, 
        json: true
    };

    request(options)
    .then(searchResultResp => {
        const searchRes = _.get(searchResultResp, 'items', []);

        res.send(searchRes);
    })
    .error(err => {
        console.log(er);
        res.send({
            success: false
        })
    })
    .catch(err => {
        console.log(er);
        res.send({
            success: false
        })
    })
});
module.exports = router;