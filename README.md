# Podcast Player: Adrian JW Thompson


## Introduction

Pocast application consuming RSS feeds from CNN, doesnt use any frameworks but would benefit from testing and better error handling of feeds. Uses Node as a proxy server for calling the RSS feed.

## Installation instructions

### Node
[install Node](https://nodejs.org/en/)  [Installation instructions can be found here.](http://howtonode.org/how-to-install-nodejs)



### Running the App

Drop the application into a local web server.
At cmd line navigate to the root application folder location:

```sh

> node proxy.js

Proxy running at http://localhost:3000/
```


Load up the index.html page in a current browser.
The RSS feed which is used can be changed by changing the RSSFEEDURL property in js/Core.js
Remember to navigate the application using the arrow and enter keys.


The application tested with Firefox 42.0, Chrome 46, Safari 8

###TODO
Add unit and user testing
Error handling