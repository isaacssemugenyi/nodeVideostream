/**
 * Video Uploading and Streaming with BinaryJS and Express 
 # NOTE: use SPDY protocol
 */
 
'use strict';

var BinaryServer, express, favicon, logger; 
var json, urlencoded, methodOverride, errorHandler; 
var http, path, app, video, server, bs;
var spdy, fs

spdy            = require('spdy');
fs              = require('fs');
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

var options = {
  key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
  cert: fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
  ca: fs.readFileSync(__dirname + '/keys/spdy-ca.pem'),

  // **optional** SPDY-specific options
  windowSize: 1024 * 1024, // Server's window size

  // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
  autoSpdy31: false
};

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

server = spdy.createServer(options, app); 

server.listen(3443);    
console.log('Video Server (SPDY) started on https://0.0.0.0:3443');

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
