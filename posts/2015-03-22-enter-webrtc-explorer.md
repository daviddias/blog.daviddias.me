---
date: 2015-03-22 17:00:00 GMT
slug: enter-webrtc-explorer 
tags: webrtc, p2p, chord, resource discovery
title: webrtc-explorer - Resource Discovery for decentralized browser networks
---

Following up the thread on my last [post](/2014/12/20/webrtc-ring), the quest to build a way to have decentralized browser communications hasn't ended I'm happy to share with you one of latest developments. 


> **UPDATE:** The talk I've delivered at [OpoJS (Oporto JS meetup)](https://twitter.com/opojs), has been published here: https://www.youtube.com/watch?v=fNQGGGE__zI

## Enter [webrtc-explorer](http://npmjs.org/webrtc-explorer)

[`webrtc-explorer`](http://npmjs.org/webrtc-explorer) brings a Chord based routing scheme to the browser, using WebRTC as the layer of transport, for fully decentralized communications and interactions between the actors of the network. In another words, you get a DHT for browser communications.

The main key differences between [`webrtc-explorer`](https://www.npmjs.com/package/webrtc-explorer) an [`webrtc-ring`](https://www.npmjs.com/package/webrtc-ring) are:

- Each peer has a real finger-table to optimize routing and reduce the number of hops
- The fingers used are ajustable (we can select how many fingers each node has)
- Ids are 48 bit in order to avoid costly big number operations in Javascript
- webrtc-explorer brings 3 new friends:
    - webrtc-explorer-visualizer - a simple app to observe the state/topology of the network
    - webrtc-explorer-simulator - a simulator service to infer possible topology scenarios
    - webrtc-explorer-browser-process - a way to distribute a mapping function over a network of browsers and collect the results.

The code is and remains fully open source, I welcome you to explore it:

- https://github.com/diasdavid/webrtc-explorer
- https://github.com/diasdavid/webrtc-explorer-signalling-server
- https://github.com/diasdavid/webrtc-explorer-visualizer
- https://github.com/diasdavid/webrtc-explorer-simulator
- https://github.com/diasdavid/webrtc-explorer-browser-process

## [webrtc-explorer](http://npmjs.org/webrtc-explorer) demo

I've recorded a small video showcasing webrtc-explorer running:

<iframe width="560" height="315" src="https://www.youtube.com/embed/kjwIjoENCRE" frameborder="0" allowfullscreen></iframe>

> **  You can see how I'm not familiar with the concept of being recorded, I'm sorry for the humming, mumbling and for repeating myself.


Thank you for reading my blog, please feel free to contact me with ideas, questions, feedback.
