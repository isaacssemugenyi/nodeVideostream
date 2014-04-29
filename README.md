# Video uploading and streaming with Node.js

By using Node modules BinaryJS for multiple streams over a single realtime websocket connection, Express as the web application framework, node-spdy for SPDY protocol, and some client-side Javascripting!

## What We'll Need

### Node.js

[Node.js](http://www.nodejs.org/) is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

[Download and install](http://www.nodejs.org/download/) Node.js

### Express

Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications. 

To familiarize yourself with the `express` API, check out the official [ExpressJS API documentation](http://www.expressjs.com/api.html)

### BinaryJS

BinaryJS is a lightweight framework that utilizes websockets to send, stream, 
and pipe binary data bidirectionally between browser javascript and Node.js.

Here's the official [BinaryJS Website](http://www.binaryjs.com/),
and here's the [API documentation](https://github.com/binaryjs/binaryjs/tree/master/doc).

### node-spdy 

SPDY Server for node.js. With this module you can create SPDY servers in node.js with natural http module interface and fallback to regular https (for browsers that don't support SPDY yet). SPDY is an open networking protocol developed primarily at Google for transporting web content. SPDY manipulates HTTP traffic, with particular goals of reducing web page load latency and improving web security. SPDY achieves reduced latency through compression, multiplexing, and prioritization. 

Want to find out more abou SPDY? Read the white paper [SPDY: An experimental protocol for a faster web](http://www.chromium.org/spdy/spdy-whitepaper), and here's the [node-spdy API documentation](https://github.com/indutny/node-spdy).


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

## HTTP video server installation

First, create the HTTP video server directory:

```
$ mkdir HttpVideoServer
```

cd to the HTTP video server directory and clone the project:

```
$ git clone https://github.com/zekaf/nodeVideostream.git
```

You need to copy package-http.json. 
cd to your nodeVideostream directory, and type this:

```
$ cp package-http.json package.json  
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

Everything working? Open a browser and head for http://localhost:3000 


## SPDY video server installation

First, create the SPDY video server directory:

```
$ mkdir SpdyVideoServer
```

cd to the SPDY video server directory and clone the project:

```
$ git clone https://github.com/zekaf/nodeVideostream.git
```

You need to copy package-spdy.json. 
cd to your nodeVideostream directory, and type this:

```
$ cp package-spdy.json package.json  
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
