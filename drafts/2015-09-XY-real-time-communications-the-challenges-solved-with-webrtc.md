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
    - describe what is going to be analised (what WeBRTC also offers, but that will not be covered, like getUserMedia and Statistics in this post)
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

The majority of WebRTC analysis posts and talks focus in understanding how WebRTC works from the API standpoint, namely the RTCPeerConnection, RTCDataChannel and getUserMedia that enable us to establish a connection between peers and get access to user media like a camera or a microphone respectively. One of the major reasons why WebRTC adoption has been growing as much is due to these APIs, which represent better primitives Real Time Communications. Nevertheless it is also interesting to understand how WebRTC tackles each of the obstacles P2P Applications have to face, so that developers can fully understand the full weigth of developing a P2P app, plus exposing the techniques, protocols and technologies used so that other P2P apps can learn from WebRTC Stack.

# Peer-to-Peer Application Stack

Making P2P applications takes us to build network agents with a 'dialing' and 'listening' interfaces, which forces us to rethink some of the models and assumptions we learned from the 'client-server' model and convinent features that came with it. For example, in a 'client-server' type of application, we assume that the public facing server has always a public IP address which we can contact as long as we are connected to the Internet, this is heaven from the network stack standpoint, as it doesn't require any complicated NAT hole punching techniques or Relay mechanism. Another convinient feature from 'client-server' is the ability to use a system like DNS to find reliably (or at least, the majority of the times) where the location of a given service is, in a P2P Application, this is harder to achieve since DNS isn't able to give us pointers to IP behind NAT and firewalls and even more important, peers (entities in a P2P network) have a higher churn rate than servers (in a 'client-server' application), changing their IPs all the time, making it harder to track.

There are 3 main questions we have to answer when developing a P2P Application and from these questions, an application architecture and network topologies emerges, there isn't any one true answer (protocol or technology) that can answer these questions and it is important to have in mind that an answer can overlap or require or reuse one of the others. These are:

- How will a peer be able to discover the whereabouts of another peers in the network.
- How to open successfuly a connection between any two peers, taking into account several network scenarioes and ways to leverage the best out of that connection.
- How can we announce and discover resources to the network, so they can be used by other peers.

**Peer Discovery** enables a peer to find another present in the network that can act as its railing point (a way to connect to the rest of the network) or simply to know more peers in the network it can use to send and relay its messages. This can take several forms, for e.g. through a bootstrap peer list of more well known and location stable peers, multicastDNS to find peers in the proximity, through al tracker and others.

**Opening a connection** between two peers in a P2P network has an additional set of challenges due to the lack of public IP addressing. A set of NAT traversal techniques have to be applied, such as NAT hole punching and/or relay in case of both peers find themselves behind several layers of NAT or in symmetric NAT. Since opening a connection can be expensive and troublesome, it is require that we use the connection to its best potential and avoid opening new ones, this means that we should have a way to multiplex several streams of data on top of a single connection. Protocol multiplexing is done traditionally on the Port level, where each port represents a different protocol we can connect and talk to, but as mentioned, due to the requirement of traverse NAT, hole punching for several ports can be complicated or sometimes even impossible, this means that in order to successfully support multiple protocols, we have to execute the protocol multiplexing on user space, negotiating the protocol at the connection or stream level.

**Resource Discovery** typically defines how the P2P topology is defined, there are two main classes, unstructured and structured, where in the first the peers need some sort of centralization to hold a index for the resources available, resources that can be from data, capababilities, presence etc, or they query each peer individually for those resources, in the other hand, a structured network topology means that the organization of the resoures is implicit, not requiring any knowledge of the network organization beforehand to find a resource. The most known structured networks is what we know as DHT (Distributed Hash Tables), you can learn more about it at one of my blog posts, where I discuss this type of P2P networks in a more detailed manner, you can find it at: [Resource discovery through WebRTC - webrtc-ring](http://blog.daviddias.me/2014/12/20/webrtc-ring).

# WebRTC Stack

In this section, I'll go through how WebRTC handles the aspects that are transversal to P2P networks specifically, things like the Media Capture or the Statistics API will not be covered in this post.

## Establishing a connection

```
image here of the pieces
```

```
image here of the flow of a peer establishing a connection to another
```
  - Turn (Relay)
  - Stun
  - Signalling
  - Identity
  - Crypto Handshake

## Transmiting data

  - Stream multiplexing
  - Protocol Multiplexing (-> types of data transmitted)
  - Reliability
  - Congestion Control


# Final Remarks
