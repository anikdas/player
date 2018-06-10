var Promise = require('bluebird');
var express = require('express');
var request = require('request-promise');
var BoxSDK = require('box-node-sdk');
var _ = require('lodash');

var router = express.Router();


var sdk = new BoxSDK({
    clientID: 'ffpoetty6inl23f111bodg6tjhil2i9f',
    clientSecret: '5m54fKrG5v6GY8uwZcsQ51PGBGnONPMd'
});

/* GET home page. */
router.get('/', function(req, res, next) {

    sdk.getTokensAuthorizationCodeGrant(req.query.code)
    .then(data => {
        console.log(data);
        res.send(data);
    })
    .error(err => {
        res.send("Error");
        console.log(err);
    })
    .catch(err => {
        res.send("Error");
        console.log(err);
    })
  
});


router.get('/oauth', function(req, res, next) {
    res.render('auth', { title: 'Express' });
});

router.get('/create_folder', function(req, res, next) {
    let client = BoxSDK.getBasicClient(req.query.access_token);

    client.folders.get('0')
    .then(data => {
        let objectList = _.get(data, 'item_collection.entries', []);

        let ytmp33Folder = _.filter(objectList, obj => {
            return obj.type === 'folder' && obj.name === 'ytmp3_folder'
        })

        if(ytmp33Folder.length > 0) {
            res.send(ytmp33Folder);
        }else{
            client.folders.create('0','ytmp3_folder')
            .then(folder => {
                res.send(folder);
            })
            .error(err => {
                res.send(err);
                console.log(err);
            })
            .catch(err => {
                res.send(err);
                console.log(err);
            })
        }
        
    })
    .error(err => {
        res.send(err);
        console.log(err);
    })
    .catch(err => {
        res.send(err);
        console.log(err);
    })
});


module.exports = router;
