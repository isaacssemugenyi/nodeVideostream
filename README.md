# Video uploading and streaming with Node.js and WebSockets

By using Node modules BinaryJS and Express, and
some client-side Javascripting!

## What We'll Need

### Express

The defacto Node.js web framework! My framework of choice, and that of many fellow
Node developers out there. It's fast, easy-to-use and well-documented.

To familiarize yourself with the `express` API, if you haven't already done so,
check out the official [ExpressJS API documentation](http://www.expressjs.com/api.html)

### BinaryJS

The heart of our video streaming web app! This module uses WebSockets and the
BinaryPack serialization scheme to stream binary content back-and-forth between
the server and the client.

Want to find out more? Here's the official [BinaryJS Website](http://www.binaryjs.com/),
and here's the [API documentation](https://github.com/binaryjs/binaryjs/tree/master/doc)
for good measure.

### SPDY (optional)

SPDY is an open networking protocol developed primarily at Google for transporting 
web content. SPDY manipulates HTTP traffic, with particular goals of reducing web page 
load latency and improving web security. SPDY achieves reduced latency through 
compression, multiplexing, and prioritization. 

Want to find out more? Read the white paper [SPDY: An experimental protocol for a faster web](http://www.chromium.org/spdy/spdy-whitepaper),
and here's the [API documentation](https://github.com/indutny/node-spdy)
for good measure.


## The Workflow

First off, I'll outline the workflow for both the server and client portions of
the video server we're building.

### Server-side

1. Create an instance of the BinaryJS server
2. Register custom events and handlers for:

* uploading videos
* requesting for a video
* listing available videos

### Client-side

1. Create an instance of the BinaryJS client
2. Upon connecting to the BinaryJS server, retrieve a list of available videos and present it
3. Clicking a link in the video list should load the affected video
4. Add a means to upload video files:

* use **Drag n Drop** for a better UX experience
* refresh the list of available videos

## Quick installation for HTTP version

First, clone the project:

```
$ git clone https://github.com/zekaf/nodeVideostream.git
```

Install dependencies. cd to your nodeVideostream directory, and type this:

```
$ npm install
```
This command installing all the stuff listed in the dependencies object (including BinaryJS and Express). 
Once NPM has run its course, you should have a node_modules directory which contains all dependencies for the project.

You now have a fully-functioning app ready and waiting to run. Let's test it out!, type: 

```
$ npm start
```

You'll get this: 

```
HTTP Video Server started on http://0.0.0.0:3000
```

Everything working? Awesome! Open a browser and head for http://localhost:3000 


## Quick installation for SPDY version

First, clone the project:

```
$ git clone https://github.com/zekaf/nodeVideostream.git
```

You need app-spdy.js and package-spdy.js SPDY. 
cd to your nodeVideostream directory, and type this:

```
$ cp app.js app-http.js
$ mv app-spdy.js app.js
$ cp package.js package-http.js
$ mv package-spdy.js package.js  
```

Install dependencies. cd to your nodeVideostream directory, and type this:

```
$ npm install
```
This command installing all the stuff listed in the dependencies object (including BinaryJS, Express and SPDY). 
Once NPM has run its course, you should have a node_modules directory which contains all dependencies for the project.

You now have a fully-functioning app ready and waiting to run. Let's test it out!, type: 

```
$ npm start
```

You'll get this: 

```
SPDY Video Server started on https://0.0.0.0:3443
```

Everything working? Open a browser and head for https://localhost:3443 
