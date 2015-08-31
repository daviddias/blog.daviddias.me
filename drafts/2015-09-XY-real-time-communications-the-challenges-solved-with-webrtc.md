---
date: 2015-09-?? 13:00:00 GMT
slug: rtc-challenges-solved-by-webrtc
tags: webrtc, p2p
title: Real Time Communications - The P2P applications challenges and how WebRTC solves them
---

(temp while writting) OUTLINE
  - Intro
    - WebRTC is a better primitives, standardized and open source for P2P applications on the Web Platform
  - Motivation on why do do this
    - Majority of WebRTC overviews start from API (approach), I want to look at the challenges transversal to P2P applications and map it directly to the spec
  - P2P architecture stack
    - enumerate issues and things we have to have to overcome them
  - WebRTC Stack
    - describe what is going to be analised
    - Establishing a Connection
      - Stun
      - Turn
      - Signaling
      - Identity
      - Crypto Handshake
      - Capabilities Handshake
    - Transmiting Data
      - Stream multiplexing (we are hinted by the the bundling)
      - Reliability and Congestion Control
  - Final remarks
    - How each org is responsible for each part
    - I will also want to cover getUserMedia and Statistics part
    - The discussion is open, everyone can participate
      - repos
      - mlists
      - I might do a blog post next on the best way to get up to speed
    - Reuse port?
  

> tl;dr; The WebRTC W3C Working Draft offers a specification for how the Web APIs for Real Time Communications must be built, that offer elegant solutions to solve the common Peer-to-Peer application challenges. This blog post presents an analysis of the technical challenges when developing a Peer-to-Peer application and how the WebRTC standard overcomes those challenges with a set of subsystems. It tries not to focus on API details so much, instead points the technologies and strategies used to achieve certain features.

WebRTC was released as an open source project in May 2011 by Google, since then, it has received several contributions by other organizations, leaded by a join standardization effort from the IETF and W3C. WebRTC appears to solve the perennial problem of having a common Real Time Communication technology, that can be used and implemented by several providers, federated, meaning that every implementation will be able to speak with each other and open to contributions.

To some extent, since its inception, WebRTC has been responsible for revolutionizing Telecomunications and reducing the barrier of entrance for new players to enter in the Market. We've seen dozens of new companies appearing in the Telecom space and also open source projects in the area of P2P, that before were simply not possible. It has been exciting to watch and be part of the WebRTC and P2P communities.

# Motivation 

Majority of the WebRTC overviews are focused on easy to use and API interface, althought that is the reason why its growing so much, it is interesting also to look how common P2P application issues were tackled and what other P2P architectures can learn from it and hopefully, even reuse

# Peer-to-Peer Application Stack

Making P2P applications takes us to build network agents with a 'dialing' and 'listening' interfaces, which forces us to rethink some of the models and assumptions we learned from the 'client-server' model and convinent features that came with it. For example, in a 'client-server' type of application, we assume that the public facing server has always a public IP address which we can contact as long as we are connected to the Internet, this is heaven from the network stack standpoint, as it doesn't require any complicated NAT hole punching techniques or Relay mechanism. Another convinient feature from 'client-server' is the ability to use a system like DNS to find reliably (or at least, the majority of the times) where the location of a given service is, in a P2P Application, this is harder to achieve since DNS isn't able to give us pointers to IP behind NAT and firewalls and even more important, peers (entities in a P2P network) have a higher churn rate than servers (in a 'client-server' application), changing their IPs all the time, making it harder to track.

There are 3 main questions we have to answer when developing a P2P Application and from these questions, an application architecture and network topologies emerges, there isn't any one true answer (protocol or technology) that can answer these questions and it is important to have in mind that an answer can overlap or require or reuse one of the others. These are:

- How will a peer be able to find another peers in the network.
- How to open successfuly a connection between any two peers, taking into account several network scenarioes and ways to leverage the best out of that connection.
- How can we announce and discover resources to the network, so they can be used by other peers.

**Finding peers**

**Opening a connection**
  NAT Hole punching
  stream multiplexing
  protocol multiplexing on the application stack

**Resource Discovery**
