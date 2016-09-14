---
title: "Get your feet wet with docker"
date: "2014-02-01"
slug: "get-your-feet-wet-with-docker"
tags:
  - "docker"
  - "node.js"
  - "meetup"
  - "lisbon"
---

> **tl;dr** This is a introductory tutorial to **docker** and how to quickly tinker with it using **boot2docker**. It was written super fast to be on time for the first [docker-lisbon meetup](http://www.meetup.com/Docker-Lisbon/events/162180092/) as a guide, might contain errors, feedback is welcome, thank you.
Ohai! :D

Today I want to talk about **Docker**, if you never heard about it, here is the best "to the point" description I could find:

> "Docker is an abstraction on top of [LXC Containers](http://lxc.sourceforge.net/). Docker introduces a workflow that makes operating containers straightforward and lots of fun.", Nuno Job. [source](https://medium.com/code-adventures/438bce155dcb)

![docker whale](/img/whaleA.png)

It is one of the most interesting and growing open source projects, created by *dotcloud*, now known as [docker.inc](http://blog.docker.io/2013/10/dotcloud-is-becoming-docker-inc/). I started gaining interest after reading [Nuno Job](https://github.com/dscape)'s [blog post](https://medium.com/code-adventures/438bce155dcb) about building your own PaaS with [Dokku](github.com/progrium/dokku) and [Docker](http://www.docker.io/), enabling anyone to create "their own personal heroku".

Eventually I got so excited using it that I started deploying every side project with it. This interested also lead me to open a [meetup group](http://www.meetup.com/Docker-Lisbon) in Lisbon, Portugal, with [Pedro Dias](https://github.com/apocas), a early adopter of Docker and author of some of the most used node.js modules to work with it. Since we are having our first [meetup next week](http://www.meetup.com/Docker-Lisbon/events/162180092/), I thought it would be a good time to write down some references about it =).

The next sections will describe how to **get your feet wet with docker** using **boot2docker**, which is great if you are on  a Mac OS X or Linux machine, my apologies for the windows users. I will not focus that much in design choices and architecture details, that you can read quickly on [docker.io](http://docker.io), my goal is to **get everyone tinkering with docker, fast**. I hope you have fun following the steps as much I had preparing them! :)


### Let's get started

#### 1. Setting up your local environment

As you may figure, there are several ways to do this, from booting a VM and configuring everything by your own, or with the familiar Vagrant, using a [Docker provided image](http://docs.docker.io/en/latest/installation/vagrant/). In this tutorial, we are focused on getting the bootstrap fast and to achieve that, we are going to use a tool by [Steve Moorin](https://github.com/steeve), called [boot2docker](https://github.com/steeve/boot2docker).  

```bash
                        ##        .
                  ## ## ##       ==
               ## ## ## ##      ===
           /""""""""""""""""\___/ ===
          {                      /  ===-    
           \______ o          __/
             \    \        __/
              \____\______/
 _                 _   ____     _            _
| |__   ___   ___ | |_|___ \ __| | ___   ___| | _____ _ __
| '_ \ / _ \ / _ \| __| __) / _` |/ _ \ / __| |/ / _ \ '__|
| |_) | (_) | (_) | |_ / __/ (_| | (_) | (__|   <  __/ |
|_.__/ \___/ \___/ \__|_____\__,_|\___/ \___|_|\_\___|_|
boot2docker: 0.4.0
```

**What is it?**: "**boot2docker** is a lightweight Linux distribution based on Tiny Core Linux made specifically to run Docker containers. It runs completely from RAM, weighs ~24MB and boots in ~5-6s (YMMV)."

To use use **boot2docker**, we need a virtual box installation, you can [download here](https://www.virtualbox.org/wiki/Downloads). If you need any help to install it, you can find [instructions here](https://www.virtualbox.org/manual/ch02.html).

**boot2docker** packs a nice command line tool that will help you boot the VM and SSH into the VM with **docker** running. In order to use it, lets first fetch and add to our bin:

```bash
# create a playground for this tutorial
$ mkdir docker-playground
$ cd docker-playground
$ curl https://raw.github.com/boot2docker/boot2docker/master/boot2docker > boot2docker
$ chmod +x boot2docker
$ ln boot2docker /usr/local/bin/
```

Now we can use **boot2docker** as a CLI, our options are:

```bash
$ boot2docker init # downloads the latest iso and sets up the VM on Virtual Box
$ boot2docker up   # boots the vm
$ boot2docker down # shuts down the vm
$ boot2docker ssh  # connects to the vm through SSH
```

We want to run `boot2docker init` and `boot2docker up` to get our VM running :) (*note:* it might take some minutes)

If everything went well, we should have our Tiny Core Linux with docker up and running already! (woa this was fast, wasn't it), you can confirm by `boot2docker ssh`, the default password is `tcuser`

Ok, we are feeling great, we have our docker thing running, now all we have to do is to pull or create some containers for our apps! :) Just wait, there is one thing that will make our workflow simplier(if you are in a Mac), the brand new **Docker OS X Client**.

To install it:

```bash
$ curl http://get.docker.io/builds/Darwin/x86_64/docker-latest.tgz | tar xvz
$ chmod +x ./usr/local/bin/docker
$ export DOCKER_HOST=tcp://127.0.0.1:4243
$ ./usr/local/bin/docker version
$ sudo cp ./usr/local/bin/docker /usr/local/bin/
```

Or in a Mac OS X and you have [homebrew](http://brew.sh/):

```bash
$ brew tap homebrew/binary
$ brew install docker
$ export DOCKER_HOST=localhost
```

Try running some docker commands, the docker client should be working fine. This commands are actually being run at the docker instance bootstraped by **boot2docker**!

```bash
$ docker -v
Docker version 0.7.4, build 010d74e
$ docker
Usage: docker [OPTIONS] COMMAND [arg...] -H=[unix:///var/run/docker.sock]: tcp://host:port to bind/connect to or unix://path/to/socket to use

> A self-sufficient runtime for linux containers.

> Commands:
    attach    Attach to a running container
    build     Build a container from a Dockerfile
... # the rest of the available commands
```

Now, let's jump to the next step and actually build a simple app to ship in a container :D

#### 2. Build a sample app and put it in a container

A **docker** container runs at the process level, which reduces greatly the resource footprint used (comparing to a VM), perfect as a unit of portable and deployable software across machines. It also offers versioning, component re-use and sharing through the [Docker Registry](https://index.docker.io/).

There are several containers already available for we to use, from database such as [MongoDB](https://index.docker.io/u/dockerfile/mongodb/) or [Redis](https://index.docker.io/u/dockerfile/redis/), [Ubuntu](https://index.docker.io/_/ubuntu/), some ready to host apps with [specific stacks](https://index.docker.io/u/dockerfile/nodejs/), etc. Here we are going to create one to host a Node.js app, previous Node.js knowledge required, we will be following the steps.

**2.1. Set up your workspace**

If you don't have Node.js installed already, go to [http://nodejs.org/](http://nodejs.org/) and click install, should only take a few minutes.

Then:

```bash
$ mkdir our-first-app-in-a-container
$ cd our-first-app-in-a-container
$ npm init 

> # It will ask you several things, I pretty much 
# just clicked `enter/return` the whole way  
# through

> This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

> See `npm help json` for definitive documentation on these fields
and exactly what they do.

> Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

> Press ^C at any time to quit.
name: (our-first-app-in-a-container)
version: (0.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (BSD-2-Clause)
About to write to /Users/DavidDias/Dropbox/Code/docker-blog-post/our-first-app-in-a-container/package.json:

> {
  "name": "our-first-app-in-a-container",
  "version": "0.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "BSD-2-Clause"
}

> Is this ok? (yes)
```

There are 3 files that we are going to need for our app in a container, a `Dockerfile`, a `index.js` and a `index.html`. To make our app more interesting and actually observe how docker can take care of the build process for you, let's use [hapijs](http://spumko.github.io/) instead of the normal [http hello world](http://nodejs.org/#column1).

```bash
$ touch index.js
$ touch index.html
$ touch Dockerfile
$ npm install hapi --save # try with sudo if you run into any issue
```

That's it, now let's code our simple app using [hapijs](http://spumko.github.io/)

**2.2. Code your app**

This app is going to be super simple, using hapijs, we are going to hook a handler to respond when a GET request is made to '/'

```javascript
var handler = function (request, reply) {
  reply.file('./index.html');
};

> server.route({ method: 'GET', path: '/', handler: handler });
```

Find the full code here: [index.js](https://github.com/diasdavid/node-app-in-a-container-example/blob/master/index.js)

We also need a HTML page that we are going to serve when the request is made, the [index.html](https://github.com/diasdavid/node-app-in-a-container-example/blob/master/index.html)

Update both files and test it out by running

```bash
$ node index.js
```

When you open your browser in [http:localhost:8888](http:localhost:8888), you should see the docker whale, like this:

![](/img/whaleyoubemycontainer.png)


**2.3. Prepare the Dockerfile**

Ok, so now we have our simple app, we are just missing one step, putting it inside a container, for that we need a **Dockerfile**.

A **Dockerfile** is like a recipe for a image that is used to instantiate containers with it. In your **Dockerfile**, you can define the `base` in which your image is going to be built on top of, followed by the steps that will prepare the rest of the image, so it we ready to deploy containers using it. I've prepared a Dockerfile file that you can see [here](https://github.com/diasdavid/node-app-in-a-container-example/blob/master/Dockerfile):

```bash
#
# Select Base image, we choose a Nodejs base 
# because it has already all the ingredients for 
# our Nodejs app
#
FROM dockerfile/nodejs

> #
# Bundle our app source with the container, we
# could also be fetching the code from a git 
# repo, or really anything else.
#
ADD . /src

> #
# Install app dependencies - Got to install them 
# all! :)
#
RUN cd /src; npm install

> # 
# Which ports you want to be exposing from this 
# container
#
EXPOSE  8888

> #
# Specify the runtime (node) and the source to 
# be run
#
CMD ["node", "/src/index.js"]

> #
# Note: You can do pretty much anything you 
# would do in a command line, using the `RUN` 
# prefix 
#
```

Using the command `docker build`, docker will fetch all the dependent layers for our container and create the image. We are going to use the `-t` option to tag our image, so we don't have to manage a random ID.

```bash
$ docker build -t our-app .
Uploading context 3.072 MB
Uploading context
Step 1 : FROM dockerfile/nodejs
Pulling repository dockerfile/nodejs
ec3f14b7134c: Download complete
27cf78414709: Download complete
b750fe79269d: Download complete
d85d887f973e: Download complete
777d184a1643: Download complete
f9bc51d0ff19: Download complete
39af521ad98a: Download complete
436d790902ea: Download complete
df89b7d55e9c: Download complete
fc24a5ffd90d: Download complete
1967e71cf0a7: Download complete
f3cffea87017: Download complete
efd2358fd6e4: Download complete
550a793d99f2: Download complete
f67efa717962: Download complete
ea2a97fa2de9: Download complete
fc24bbfb9d86: Download complete
 ---> ec3f14b7134c
Step 2 : ADD . /src
 ---> f12ed6856631
Step 3 : RUN cd /src; npm install
 ---> Running in c3ff18d6b31d
WARN package.json our-first-app-in-a-container@0.0.0 No description
npm WARN package.json our-first-app-in-a-container@0.0.0 No repository field.
 package.json our-first-app-in-a-container@0.0.0 No README data
 ---> 705fb4c97076
Step 4 : EXPOSE 8888
 ---> Running in f2b576b8e9d4
 ---> d0c783a36b47
Step 5 : CMD ["node", "/src/index.js"]
 ---> Running in 8558a6bad56d
 ---> 68b7ac1f9e38
Successfully built 68b7ac1f9e38
```

Now we can check that our image was created by:

```bash
$ docker images
REPOSITORY TAG    IMAGE ID     CREATED  ...
our-app    latest 68b7ac1f9e38 1 hour ag...
```

**2.4. Ship it!**

In order to see our app running, we will need 2 things, the first is a result of using virtual box, we need to perform a port-forward to contact the virtualized machine properly, the second will be starting a container from our image (we are almost there! :) ).

We will port-forward 8888 from boot2docker-vm to 8888 in our local machine with a simple command:

```bash
$ boot2docker down # The VM must be stopped
$ vboxmanage modifyvm boot2docker-vm --natpf1 "http,tcp,127.0.0.1,8888,,8888"
$ boot2docker up
```

**Note:** Since boot2docker-vm was made to not have persistence (since it is a ephemeral environment), we have to build our container again:

```bash
$ docker build -t our-app .
```

Ok this part is done, now all we have to do is run our app! We are going to use the **`-p` option to map the container port to the host port**, otherwise docker would assign a random mapping, which we would have later to inspect.

```bash
$ docker run -p 8888:8888 -t our-app
# to see that the container is running
$ docker ps 
CONTAINER ID        IMAGE          ...        
4f401640c004        our-app:latest ...
```

I tipically like to test the first time with the `-i` (interactive), just to see the logs directly on the same session, but that is just me :)


Open your browser in [http://localhost:8888](http://localhost:8888) and say hi to your whale friend from the container land :)

#### What's next

This was a super quick and intro of how to try how docker, there is so much more! For example, you can quickly test your apps in your local containers and when they are ready, ship them to a staging environment or into production.

One of my favorite projects using docker is **dokku**, your own personal Heroku, I used it to prototype and deploy a ton of my side projects, you can find it super reviewed and documented by Nuno, [**go check it now!**](https://medium.com/code-adventures/438bce155dcb).

Other stuff you might want to deepen your knowledge check is:

- Getting Started - https://www.docker.io/gettingstarted/
- Docker files tutorial - https://www.docker.io/learn/dockerfile/
http://crosbymichael.com/dockerfile-best-practices.html
- Docker conf - http://dockerconf.com/
- Talk by Solomon Hykes - http://www.youtube.com/watch?v=3N3n9FzebAA
- Trusted builds - http://blog.docker.io/2013/11/introducing-trusted-builds/

#### Thank you

Thank you for reading this post, I can't wait to see all the stuff you are going to do with Docker. I also want to thank Nuno Job for railing on the Docker trail, Pedro Dias for reviewing the technical aspects and Nuno Nogueira for being the first to do a clean try run.
