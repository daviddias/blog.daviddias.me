---
date: 2016-02-28 15:00:00 GMT
slug: webrtc-explorer-2-0-0-alpha-release
tags: WebRTC, JavaScript
title: WebRTC Explorer 2.0.0 alpha release
---

![](https://github.com/diasdavid/webrtc-explorer/raw/master/graphs/webrtc-explorer-logo-small.png)

I've started working a couple of weeks ago in a refactor of the whole WebRTC Explorer project. Since I started talking about it, I've received a lot of feedback and interest on the module, with people requesting new features or simple tinkering with it for their own projects. This is what I believe all one could wish for an open source project, so I thank you!

Now, with the learnings of doing it for the first time and everything I've been developing on the [JavaScript implementation of IPFS](https://github.com/ipfs/js-ipfs), the InterPlanetary FileSystem, I've come up with some new ideas to make WebRTC Explorer better, and more importantly, easier to use and to contribute.

## Quick intro to WebRTC Explorer

If you are new to WebRTC Explorer, it is essentially bringing Packet Switching to the Application Level, using WebRTC Data Channels as the transportation layer between nodes.

WebRTC enables communication between browsers without needing mediators (servers), enabling us, the users, to route packets between machines, using the Web technologies only.

WebRTC is inspired by the Chord routing scheme to create routing tables that are evenly balanced accross nodes.

I've explained in more detail my main motivations at OPOJS, you can watch my talk below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/fNQGGGE__zI" frameborder="0" allowfullscreen></iframe>

Although it was done while I was working on the version 1.0.0, the goals and core mechanisms are still the same today.

## 2.0.0 goals

The second iteration of WebRTC Explorer is all about robustness (speed) and developer UX (making it easy to use WebRTC Explorer as a drop in replacement for other transports) and since we are it, add features that have been requested for a while, such as signalling through the Chord Routing, instead of only through the signalling server.

#### A logo

The first update: I've decided to make a logo for the project, woot! It is really simple and even though it has no technical advantage whatsoever, it makes me feel that the repo looks better and organized. Check it at the top of this blog post or at the [repo](https://github.com/diasdavid/webrtc-explorer).

#### Overall code revamp

The entire codebase was refactored (https://github.com/diasdavid/webrtc-explorer), dependencies were updated, codestyle was migrated to [standard](http://npmjs.org/standard), and the signalling server is now part of the webrtc-explorer repo, quickly accessible as a CLI tool once the module is installed globally.

```
> npm i webrtc-explorer -g
sig-server
Signalling Server Started
```

#### Complete API redesign

The interfaced moved from a message oriented ('send, receive') to a Node.js net.Socket like interfaces, so it can be compatible with the interfaces specified by [interface-transport](https://github.com/diasdavid/interface-transport) and [interface-connection](https://github.com/diasdavid/interface-connection), making it easy to drop in webrtc-explorer as a replacement for other transports.

#### Two signalling modes

One of the most requested features, was the ability to exchange signalling data through the Routing Overlay. This is WIP in progress, but something that will be part of the final 2.0.0 release.

#### Select the fingers to use from the node itself

Previously, the setup required to specify how many fingers should each node have in advance, now, with the new call `explorer.updateFinger(<row>)`, each node can select which rows from its finger table to update and only creating the channels to those. The only requirement remains that every node has at least to have a finger to its successor.

#### Improved documentation

More complete and yet still growing API and Architecture documentation, at the README of the project.

#### Tests

[`piri-piri`](https://github.com/diasdavid/piri-piri), the P2P browser testing framework was updated to use [`electron`](http://electron.atom.io/) shells instead of full browsers, making it faster. Also, webrtc-explorer were rewritten, a bunch were added and the test base will continue to grow.

## Next

This is the alpha release, I'll give a proper update again when the final is released, meanwhile, you can track the progress at the [milestone I created on the github repo](https://github.com/diasdavid/webrtc-explorer/milestones/2.0.0)

## Thank you

Hope you enjoyed this update, feel free to post questions by [email](mailto:mail@daviddias.me) or by opening an issue on the [webrtc-explorer repo](https://github.com/diasdavid/webrtc-explorer).

If you liked this post, you might also fancy reading my two previous posts on this project:

- [webrtc-explorer - Resource Discovery for decentralized browser networks](http://blog.daviddias.me/2015/03/22/enter-webrtc-explorer)
- [Resource discovery through WebRTC - webrtc-ring](http://blog.daviddias.me/2014/12/20/webrtc-ring)

