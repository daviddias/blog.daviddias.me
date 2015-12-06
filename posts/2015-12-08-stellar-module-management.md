---
date: 2015-12-08 15:00:00 GMT
slug: stellar-module-management
tags: IPFS
title: Stellar Module Management - Install your Node.js modules using IPFS
---

![](node-interactive-logo.png)

Node.js Interactive, the first Node.js conference organized by the Linux Foundation, happened on Dec 8-9 of 2015 and it counted with hundreds of participants, dozens of really amazing talks divided in 3 specific tracks, backend, frontend and IoT.

I was fortunate to attend and present a project we've been developing at [Protocol Labs](https://ipn.io), that builds on on top of [IPFS, the InterPlanetary FileSystem](https://ipfs.io).

You can learn about that project in this blog post, check out the [talk slides]() or wait for the video recording of the talk, I will update this blog post when that happens.

## Enter registry-mirror

[ ] NODEICO HERE WITH LINKS TO GITHUB
[ ] MADE BY PROTOCOL LABS BADGE STUFF
[ ] explain how it works arquitecture wise


## Getting started

In order to get started, you must first be sure that you are running IPFS 0.4.0. IPFS 0.4.0 is a yet to release version, but you can already use it by compiling from source or downloading the pre-built binary.

#### Compiling from source

[ ] 

Please make sure you have go 1.5 or above installed.

#### Downloading pre-built Binary

[ ] from go builder

#### Installing and running registry-mirror

Once you have IPFS 0.4.0 available, install registry-mirror by running the following command (you should have Node.js 4 and npm 2 or above available): 

```bash
$ npm i registry-mirror -g
## ...
```

Then start your IPFS daemon, run:

```bash
$ ipfs daemon
Initializing daemon...
Swarm listening on /ip4/127.0.0.1/tcp/4001
Swarm listening on /ip4/172.19.248.69/tcp/4001
Swarm listening on /ip6/::1/tcp/4001
API server listening on /ip4/127.0.0.1/tcp/5001
Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
Daemon is ready
```

After, run registry-mirror daemon with the --ipfs option:

```bash
$ registry-mirror daemon --ipfs
........
```

Now, to install a module using IPFS, you only need to set this local registry when running an `npm install`, this can be done through [config]() or a command line argument:

```bash
$ npm i bignumber --registry=http://localhost:XXXX
.......
```


## Features

`registry-mirror` itself is quite a simple application while most of the heavylifting is done by [IPFS](https://ipfs.io). IPFS distributed nature has a set of really nice feature as a transport layer that `registry-mirror` leverages to create its service.

#### Find where the module lives without having to hit the backbone

With `registry-mirror`, a registry becomes a curated list of hashes, while the modules live in the network, as soon as `registry-mirror` caches this list locally (which it gets from the IPFS network), it has a list of the hashes of the modules that a user might need in the future. With this list, a user doesn't have to know of the whereabouts of a module until it needs to request it from the network.

This list is fetched and kept up to date through IPNS, and since IPNS records are signed and validated, there is no way for the list to be compromissed (with the exception of the private key of the publisher being compromised).
#### Work offline/disconnected

Just like git, `registry-mirror` is able to work offline and/or in a disconnected scenario, as long as the module you are looking for exists in the part of the network you are currently in, IPFS would be able to find it through Peer and Content Routing (with a DHT).

#### Enable several registries to co-exist

Once the notion of a registry becomes a curated list of modules available, it gets simplier to enable more than one registry to exist, this scenario can be specially interesting for private networks such as the ones within companies and organizations that don't want they modules to be public known and available.

#### Run only what you were looking for

Through cryptographic hashing, IPFS strategy to find, deliver and check that the content it received was what requested, you can always be sure that what you are running was what you were looking for.

#### Faster

By leveraging local and network caches efficiantly, downloading your dependencies can be much faster as it avoids going to npm, Inc servers or CDN all the time. This can be crucial in high latency networks or more remote areas.

## Demo Video

[ ] VIMEO EMBED HERE

## A special thanks

[ ] bengl and everyone involved in making this possible
