/**
 * Video Uploading and Streaming with BinaryJS and Express
 */
 
'use strict';

var BinaryServer, express, favicon, logger; 
var json, urlencoded, methodOverride, errorHandler; 
var http, path, app, video, server, bs;

BinaryServer    = require('binaryjs').BinaryServer;
express         = require('express');
favicon         = require('static-favicon');
logger          = require('morgan');
json            = require('body-parser');
urlencoded      = require('body-parser');
methodOverride  = require('method-override');
errorHandler    = require('errorhandler');
http            = require('http');
path            = require('path');
app             = express();
video           = require('./lib/video');

// all environments
app.use(favicon(__dirname+'/public/favicon.ico'));
app.use(logger('dev'));
app.use(json());
app.use(urlencoded());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

server = http.createServer(app);

server.listen(3000, function () {
    console.log('HTTP Video Server started on http://0.0.0.0:3000');
});

bs = new BinaryServer({ port: 9000 });

bs.on('connection', function (client) {
    client.on('stream', function (stream, meta) {
        switch(meta.event) {
            // list available videos
            case 'list':
                video.list(stream, meta);
                break;

            // request for a video
            case 'request':
                video.request(client, meta);
                break;

            // attempt an upload
            case 'upload':
            default:
                video.upload(stream, meta);
        }
    });
});
