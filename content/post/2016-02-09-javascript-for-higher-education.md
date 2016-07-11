---
title: "JavaScript for Higher Education"
date: "2016-02-09"
slug: "javascript-for-higher-education"
tags:
  - "education"
  - "JavaScript"
---

Recently, I've delivered an impromptu talk at Lisbon, the world's most northen JavaScript Conference. The talk was about JavaScript for Higher Education.

![](/img/northen-lights.jpg)
> Some of the attendees of ArcticJS getting completely blown away with the Northen Lights

The decision to make and deliver this talk came after having a good conversation with [Thomas Watson](https://github.com/watson), one of the ArcticJS organizers, on ways to to increase Node.js adoption. During this conversation, I had the chance to think through what I've been doing to help the developer community in Lisbon to grow, which his inherently related to the Node.js and JavaScript communities since that has been what I've focused for the last few years.

> tl;dr; From my current perspective, one of the ways we can cause greater growth, is by making Node.js part of the CS degree curriculums and the tool of choice for students and researchers to develop their projects. This blog post is a collection of notes from my experience as a Student, a Researcher and now as a Professor at the University of Lisbon, which has created a course from the ground up for Modern Web Development. You can also watch the [talk on video](https://www.youtube.com/watch?v=L_GW3G_6ZmU) below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/L_GW3G_6ZmU" frameborder="0" allowfullscreen></iframe>

## As a student

Since I entered college, literally, since I finished the first semester, I started being bombarded with job offers from all kinds of companies based in Portugal. It was good to known that I had picked a degree that would open my doors to so many career options, but little did I know how anything worked. i

Later, I started noticing that the majority of this job offers were to work in established technologies (also known as something that is not particularly exciting anymore), such as PHP or Java and the majority of them were for 'consulting'. I thought several times to myself, looking at was exciting on the Internet, that these companies were clearly 'old fashioned' by not having projects with tech that all the 'cool kids' were talking about.

Time passed, I became very interested by what was happening on the Node.js and something struck my attention, with the explosive Node.js growth rate, a ton of new jobs suddenly appeared and reading the case stories from the companies that moved their stacks from some other language to Node.js, one of the great reasons presented was that they would be able to hire great new talent for their teams. This might not seem relevant for small companies, but when you need to increase the size of your team to hundreds of thousands of developers, the talent pool available might have the same weight on the decision to pick the technology as the quality and features that technology could bring to your products.

This becomes a cycle, thousands of students graduate every year from CS degrees, and where the CS degree is fully focused on Java and Web Services with SOAP for the most part, that is the talent pool that will be available. I don't have any numbers, but evaluating by the sample I have from my University classmates and their peers, there is a significant number of graduates that 4 years after finishing their degree, are still working on the same technology and environment they learned during their degrees.

This isn't necessarily a bad thing, but makes the point that what gets taught at the Universities, is in some part what is going to drive the technology decisions in future product generations.

## Stepping into Research land (do my M.Sc.)

When I got to my M.Sc. I had already a job, it was tough doing the two things at the same time (+ [LXJS](http://2014.lxjs.org), [Startup Scholarship](http://startupscholarship.org) and other projects), but doable and very rewarding. What this enabled me was to be able to very picky on what was going to be my M.Sc. thesis, because I didn't have a 'picking something and get it done quick, because I was burned out of college' mentality, like other graduate students do. The M.Sc. was definitely very valuable for me.

I went and I 'interviewed' a bunch of professors and I came with my own idea, build a P2P Distributed Computing platform, using the Web Platform and WebRTC. Some of them said no, after all, why would they mentor me in some work that was not relevant to their research, but eventually I met the right fit and I got both a great mentorship to do a thesis plus all the freedom to research what I wanted, it was great, but then, the fun begun.

The academic world is undoubtedly very intriguing, it works mostly around reputation and researchers are typically very protective of their ideas, which was essentially the opposite of what I have been experience on the Open Source ecosystem.
When I explained that I was making everything open source from the beginning, I was told that 'I could not do that', my obvious reaction to this affirmation was 'Why?', in which the answer was 'What if someone publishes the work before you?'. I guess it is a valid point, but I wasn't honestly concerned with that, I was frustrated with the fact that there was so much researched published and that I could not test myself because the code was not public.

In the end, everything went really well, because I did it all opensource, I got invited to give talks about it, a lot of people started reviewing it and using it for their own research in other Universities, from grad students to PhD candidates, even before I delivered the Thesis! It was very exciting (The traditional cycle would be: 1) Deliver the Thesis, 2) Submit and wait to get approved at some conference to publish a paper, 3) Hope that someone notices the paper and references it).

The prof that had been mentoring me was very happy with the results, and later in that year, he called me to make me an invitation on what was going to become the next chapter on this "JavaScript for Higher Education Adventure", to become an University Professor.

## Sitting on the other side, notes from becoming a Professor

Something must have gone right, because now I was not only having the opportunity to teach (which I secretly wished for a while) and to be the one making the calls on what and how it was going to be delivered. I decided to have 3 main foundations:

- a) Use Node.js
- b) Everything has to be open source
- c) Labs had to use the nodeschool format

#### a) Use Node.js

It had to be, not only for what Node.js is, but for the inspiration that the community has to offer, from science, music, robots, conferences, it is a world of fantastic people and if I was going to teach a class, the first thing I wanted to make sure, was to open the door to this ecosystem.

Funny fact: I got asked why I added 'npm' to the course curriculum and the question was a bit like this: "Do you really have to teach 'npm'? Isn't that just the package manager? Can't they use Node.js without it?", my answer was an exciting "of course it has to be part of the of the course, Node.js is just not about the technology, it is also about the ecosystem". In that moment I remembered how no one is really incentivized to use any package manager during the other courses, everything is built from scratch and looking at your neighbor code was called cheating.

#### b) Everything has to be open source

Following point a), one of the things I wanted was to make it so students would develop their projects in the open by using github as the host. This was an incentive to feel ok at looking at others people code and learn from them, as long as they would make the effort to understand and not just copy paste, the level of the quality of the output could only increase.

My honest goal was to make this more of a standard practice amongst students, so that the next time someone wants to do research for their M.Sc or PhD, doing it open source is just natural.

#### c) Labs had to use the nodeschool format

I love running NodeSchool Lisbon and helping out in other NodeSchool events across the globe when I'm around, it is fun, people love it, I've seen from beginners to advanced level and everyone always takes something from it, so there was no reason not to use the same format.

I received several positive comments from the students, they seem to love it, in fact, during these lab classes (with 2:30h of length), no one wanted to take the mandatory class break, some of them even stayed 30 to 45 minutes more to continue learning. One student asked if I could give all of the lab classes and if they could always be that way :). I of course explained them the phenomenon known as [JIFASNIF](https://twitter.com/jifasnif).

Apparently, it went well and there is going to be a second edition of this course. If you are curious, here is the syllabus: https://gist.github.com/diasdavid/a9d4d3d98f69a175d3c3

## Summing up

There is no need to be afraid of pushing for open collaboration and research on the academic environment, it can be more interesting for the researcher and advantageous for the University, creating a win win scenario.

Node.js can make learning CS even more fun, nodeschool taught us that. There is a huge pool of people that would be very much excited to learn Node.js and use it for their own endeavours, even correctly introduced to it.

Using Node.js helps also the speed of learning, since it is so fast to hack something together, Q.A. sessions can be interactive and productive.

## What can we do to increase Node.js adoption on college curriculums

I understand that is not easy to go to an University and change the curriculum altogether, in fact, my story required a syzygy of its own, it is very rare to be a professor if not already part of the University and or not a PhD student, teacher assistants (grad students) typically don't have the right to weigh in on course decisions, even less making one from scratch. Nevertheless, there are some things we can do more easily:

- Organize a NodeSchool event inside a University, planting the seed and watching it grow.
- Become a mentor. I've given some help and guidance to younger students that showed interest in learning more. Now, some of them even have full time Node.js jobs or are just using Node.js for their Academic projects.
- Try to tap into the research groups of Universities and ask what are their focus, ask if they have stuff open source and ask if you can contribute, the chain reaction that can come from making this questions might make a project open that wasn't before
- Get involved with the ["Interdisciplinary Programmer"](https://www.khanacademy.org/computing/computer-programming/meet-the-computing-professional/a/bill-mills-physicist-and-interdisciplinary-programmer) program and tag along with Researchers to make science even better.

## Well, this is all

Thank you for reading my blog :) I hope you enjoyed this post.
