var fs = require("fs"),
	_ = require("underscore"),
	crypto = require("crypto"),
	minimatch = require("minimatch");

function wtchr(path, options) {
	// Watch options
	var o = _.extend({
			persistent: true,
			interval: 500,
			ignore: /(\/\.DS_Store$)/
		}, options || {}),

		// Cache watch contexts by path
		cache = {

		},

		// Events stack
		events = {

		},

		// Wtchr object
		Wtchr = {
			// Bind event
			on: function (types, match, handle) {
				// Without minimatch selector
				if (typeof match !== "string") {
					handle = match;
					match = undefined;
				}

				// Bind each event type
				types.replace(/^\s+|\s+$/g, "")
					.split(/\s+/)
					.forEach(function (type) {
						var eventStack = events[type] || (events[type] = []);

						// Register event
						eventStack.push({
							match: match,
							handle: handle
						});
					});

				return Wtchr;
			},

			// Unbind event
			off: function (types, match, handle) {
				// Unbind all events
				if (!arguments.length) {
					events = {};
				}
				else {
					// Without minimatch selector
					if (typeof match !== "string") {
						handle = match;
						match = undefined;
					}

					// Unbind each event type
					types.replace(/^\s+|\s+$/g, "")
						.split(/\s+/)
						.forEach(function (type) {
							var eventStack = events[type];

							if (eventStack) {
								eventStack = eventStack.filter(function (event) {
									return !((match === undefined || match === event.match) && (handle === undefined || handle === event.handle));
								});

								if (!eventStack.length) {
									delete events[type];
								}
							}
						});
				}

				return Wtchr;
			},

			// Destroy watcher and stop all watchings
			destroy: function () {
				Wtchr.off();
				unwatch();
			}
		};

	// Event trigger handle
	function trigger(type, path, curr, prev) {
		(events[type] || [])
			.forEach(function (event) {
				if (event.match === undefined || minimatch(path.replace(/^\.\//), event.match)) {
					event.handle(path, curr, prev);
				}
			});
	}

	// Create hash from file
	function hash(path) {
		var hex = crypto.createHash("md5");

		hex.update(fs.readFileSync(path));

		return hex.digest("hex");
	}

	// Stop watching
	function unwatch(path) {
		// Unwatch all
		if (!arguments.length) {
			for (path in cache) {
				unwatch(cache[path]);
			}
		}
		// Unwatch by path
		else if (cache[path]) {
			fs.unwatchFile(path, cache[path].handle);
			delete cache[path];
		}
	}

	// Start watching
	function watch(path, childs) {
		var context = cache[path] = {
				childs: childs,
				hash: childs ? false : hash(path),
				handle: function (curr, prev) {
					var eventType = fs.existsSync(path) ? "change" : "delete";

					// Delete
					if (eventType === "delete") {
						trigger(eventType, path, curr, prev);
						unwatch(path);
					}
					// Create
					else if (childs) {
						var childsCurr = fs.readdirSync(path);

						(childsCurr)
							.filter(function (child) {
								// Filter for new childs
								return childs.indexOf(child) === -1;
							})
							.forEach(function (child) {
								// Trigger create and init recursive
								init(path + "/" + child, true);
							});

						// Refresh child list
						childs = childsCurr;
					}
					// Change
					else {
						var hashCurr = hash(path);

						if (hashCurr !== context.hash) {
							context.hash = hashCurr;
							trigger(eventType, path, curr, prev);
						}
					}
				}
			};

		// Create watch worker
		fs.watchFile(path, {
			persistent: o.persistent,
			interval: o.interval
		}, context.handle);
	}

	// Initialize a watch path
	function init(path, created) {
		var childs,
			isDir;

		// Trim trailing slash
		path = path.replace(/\/$/, "");

		// Break if ignore matches
		if (o.ignore.test(path)) {
			return;
		}

		// Check whether current path is dir
		isDir = typeof isDir === "undefined" ? fs.lstatSync(path)
			.isDirectory() : isDir;

		// Trigger create event if specified
		if (created) {
			trigger("create", path, fs.statSync(path));
		}

		// Init watch
		watch(path, isDir ? (childs = fs.readdirSync(path)) : false);

		if (isDir) {
			// Walk recursive
			childs.forEach(function (child) {
				init(path + "/" + child, created);
			});
		}
	}

	// Initialize
	init(path);

	// Return wtchr object
	return Wtchr;
};

// Example
/*
	wtchr("./")
		.on("create", function (path) {
			console.log("CREATE: ", path)
		})
		.on("change", function (path) {
			console.log("CHANGE: ", path)
		})
		.on("delete", function (path) {
			console.log("DELETE: ", path)
		});
*/


// Expose module
module.exports = wtchr;