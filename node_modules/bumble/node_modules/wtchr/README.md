# wtchr

Simple file/directory watcher. (Node.js)

## API

It's quite simple to create a wtchr for a directory.

### wtchr object

```
wtchr(path, [options]);
```

#### path
- an absolute dircetory path

#### options:
- **persistent** (boolean) default: ```true```
- **interval** (integer) default: ```500```
- **ignore** (regexp) default: ```/(\/\.DS_Store$)/```

#### Example:

```javascript
var watch = wtchr('/my/watch/base/directory');
```

### wtchr events 

Wtchr provides simple event bindings. The event API is quite similar to jQuery events, so most of JS developers are familiar with it.

**bind an event**

```
.on(type, [selector], handler(path, curr lstat, prev lstat))
```

**unbind an event**

```
.off(type, [selector], [handler(path, curr lstat, prev lstat)])
```

#### type:
- one of the 3 supported types ```create``` / ```change``` / ```delete```

#### selector
- a minimatch path selector (simply a filter)

#### handle: 
- a event handler

#### Example:

```javascript
var watch = wtchr('/my/watch/base/directory')

watch.on("create", "*.js", function (path, curr, prev) {
  console.log("New file: " + path);
});

watch.off("create");
```

Chaining:

```javascript
wtchr('/my/watch/base/directory')
  .on("create", "*.js", function (path, curr, prev) {
    console.log("New file: " + path);
  })
  .on("change", "*.js", function (path, curr, prev) {
    console.log("File changed: " + path);
  })
  .on("delete", "*.js", function (path, curr, prev) {
    console.log("File deleted: " + path);
  })
  .off("create")
  .off("delete");
```

### stop wtchr

Simply destroy the wtchr object with the destroy method.

```
.destroy()
```

#### Example:

```javascript
var watch = wtchr('/my/watch/base/directory')

watch.destroy();
```
