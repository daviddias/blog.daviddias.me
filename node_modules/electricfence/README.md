# electric fence

This is a small hapi module to allow you to serve files and directories
from a local path mapped to a url.

## How to use

Simply give it a local path and a remote base url

```
var electricfenceConfig = {
    path: 'public',
    url: '/',
    listing: true,
    index: false,
    cache: 3600000
};

plugin.require({electricfence: electricfenceConfig});
```
Those are the defaults, so if you pass it nothing those will be used.

- ``path`` (string, optional, default ``public``): folder to serve files from
- ``url`` (string, optional, default ``/``): url to serve files at
- ``listing`` (boolean, default ``true``): determines if 'index.html' will be served if found in the folder when - requesting a directory
- ``index`` (boolean, default ``false``): determines if directory listing is generated when a directory is requested without an index document
- ``cache`` (integer, default ``3600000`` (one hour)): time in milliseconds to tell the browser to cache results. Set to 0 to disable browser caching headers
-   labels  (string or array, will be passed to pulgin.select see <a href='http://hapijs.com/api#pluginselectlabels'>Hapi API docs</a> for more information.

## Why?

"But Gar," you say, "hapi already has directory and file handlers!"

Yes, but if your server already has a catchall route such as:

```javascript
server.route({
    method: 'get',
    path: '/{posts*}',
    handler: postHandler
});
```

You can't then add

```javascript
server.route({
    method: 'get',
    path: '/{path*}',
    handler: {directory: {path: 'public'}}
});
```

The paths will conflict.  What electricfence allows you to do is just this.

## How it works

electricfence adds explicit file and directory handlers for anything that's in the local path you give it.  This means for example if you have a ``js`` and ``css`` directory in ``./public``, and you also have a ``robots.txt`` file, electricfence will add these handlers


```javascript
server.route({
    method: 'get',
    path: '/css/{path*}',
    handler: {directory: {path: 'public/css'}}
});

server.route({
    method: 'get',
    path: '/js/{path*}',
    handler: {directory: {path: 'public/js'}}
});

server.route({
    method: 'get',
    path: '/robots.txt',
    handler: {file: {path: 'public/robots.txt'}}
});
```
