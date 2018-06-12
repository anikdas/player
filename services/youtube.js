const Promise = require('bluebird');

const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const _  = require('lodash');


function formatChooser(format) {

    var formatType = _.get(format, 'type', '');  

    if(formatType.startsWith('audio/webm')) return true;
    if(formatType.startsWith('audio/mp4')) return true;

}

function getStreamOrDownloadLink(ytLink) {

    return new Promise((resolve, reject) => {
        ytdl.getInfo(ytLink, (err, info) => {

            if (err) {
                return reject(err);
            }

            var format = null; 

            try{
                format = ytdl.chooseFormat(info.formats, { filter: formatChooser });
            }catch (e){
            }

            console.log(format);
        
            if(format === null) {

                return reject(new Error('No audio stream found'));
        
            }else{
                return resolve(format.url)
            }

        });
    });
}

module.exports = {
    getStreamOrDownloadLink,
    formatChooser
}