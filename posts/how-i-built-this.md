---
title: 'How I built this blog'
date: '2022-10-11T04:56:00.000+10:00'
---
I've always wanted to build a blog, a real blog. To me, that means it is fast, static, responsive, in markdown with as
few images as possible, and has a full-text RSS feed.

### Design

This section is where I pretend that I had a complete design in mind before I actually started building it. But in my
defence, having some clear goals is more than enough for a personal project like this.

Firstly, the full text is very important to me, both in the RSS feed and on the actual home page. No 'read more' links,
no unfold button, and no going to the link to read the full article in the RSS feed. Every post should be displayed on
the home page in reverse chronological order. Yet every post should have its own individual page with a human-readable
link.

I wanted to use thin, sans-serif fonts with muted theme colors for a modern look. After comparing the design of a few of
my favorite personal blogs (none of which are exactly modern):

- [Daring Fireball](https://daringfireball.net/)
- [Marco.org](https://marco.org/)
- [Hypercritical](https://hypercritical.co/)

I chose Avenir Next used by marco.org for the font. As for the colors,
the [Morandi color palette](https://github.com/narcisoyu/moRandi) is great for reading.

### Development

Before this, I've heard (seen on YouTube and Reddit) a lot of good things about [Next.js](https://nextjs.org/). React is
the framework I'm most familiar with, but the heaviness and inelegance has always bothered me. So many third party
packages and so much client side rendering. A site built with React has always felt bloated, or as kids these days call
it—a hecking chonker. The dependency hell is hard to avoid, especially when I'm just starting, but the inelegance and
heaviness was improved a lot by using Next.js. Despite being built on top of React—then on top of Node and then on top
of JavaScript—Next supports server side rendering and most importantly, static site generation, which is perfect for a
blog. Not to mention the free deployment provided by the creator of Next, Vercel. It is truly fantastic, just don't
think about how much of the modern digital infrastructure is built in[ this way](https://xkcd.com/2347/).

Jumping right in, search for a blog template on Vercel, clone, build, deploy, and hit the first brick wall. The template
uses a very new library called [Nextra](https://nextra.vercel.app/), and its claim of having a blog in 10 minutes is
real and spectacular. However, if you want some personality on your documentation or blog, there is no option to
customize the completely white templates. Starting over with pure Next proved to be much better.

The rest of the process was very similar to developing with React, but on steroids. No need to worry about routing and
pages, as long as you put the `.js`, `.html`, even in some cases `.md` files into the pages directory, it will
automatically become a path on the server. The `.md` part, however, has proven to be the second brick wall. There is
already a framework called `MDX` that allows using markdown files ending in—you guessed it— `.mdx` as both a markdown
files and a `.jsx` component. However, taking this dream like component out of its context and into other JavaScript
files as a component has proven to be a nightmare. Turns out, they were designed to be used as individual pages.
Unintuitiveness while writing JavaScript? I know, truly unheard of. Abandoning that idea, the traditional `marked`
library worked with few issues.

The last technical hurdle was actually building the RSS feed, which after trying 3 different methods, just would not
work. Turns out the methods were all fine, I was just passing markdown into it instead of HTML, therefore completely
breaking the feed. This is one of those situation where you completely understand you've died fair and square in Call of
Duty but still have to call it bullshit in front of no one.

### Future improvements

- [ ] Dark mode

- [ ] More markdown syntax support
  Which seems pretty difficult without creating my own markdown parsing library, so it will stay a long-term goal.
  Standard markdown is good enough for almost everything anyway.
- [ ] Home page render limit. Will build this once there are too many blog posts.
- [x] Linking to external websites right in the title, like how Daring Fireball does it.
- [ ] Automating posting so I don't have to manually build and deploy everytime.