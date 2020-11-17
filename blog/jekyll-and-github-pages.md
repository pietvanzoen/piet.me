---
title: Moving from shared hosting to Github pages
date: 2013-10-12

---

When my shared hosting plan was coming up for renewal I struggled to find a hosting service that I liked. I was hoping for good uptime, something that didn't break the bank, and preferably something with a decent UI. (Maybe I was asking to much.) [Webfaction](https://www.webfaction.com/?affiliate=pietvanz) was a great option for a while but \$9.50 a month for a few small sites was more than I wanted to spend. That said, the UI and features make Webfactions my favourite shared hosting option.

<!-- excerpt -->

In the end I went for something a little different. Between [Jekyll](http://jekyllrb.com) and [Github Pages](http://pages.github.com) I now host this site for free.

## Launching a not-so-static 'static site'

Github Pages provides free hosting for static pages. So all you can use is html, css, and javascript. No server-side scripts and no databases. You can do custom domains, and your site is deployed straight from a repo every time you push to it.

But obviously this wouldn't work for a most blog platforms which rely on databases and server-side scripting to store and serve pages. This is where Jekyll comes in. You setup your includes, layouts, variables, pages, and blog posts, and Jekyll will generate a static site from them. The added bonus is that you can write your posts and pages in [markdown](http://daringfireball.net/projects/markdown/) and Jekyll renders them as html.

What's also fun, is that Github pages will build your Jekyll site for you each time you push a change. So that's what I'm doing. My site is Jekyll generated and hosted on Github, and I love it. No database, great uptime, really fast, and free.

![thumbs up](/images/30-rock-yes.gif)

## But it's not for everything

The catch with Github pages is that A) for it to be free you have to use a public repo, and B) it's intended purpose is for "you and your projects". As far as I can tell there aren't any actual restrictions on content, but I wouldn't feel comfortable using Github pages for Cafe van Zoen, which is more of a personal blog.

For Cafe van Zoen I ended up using [Amazon S3](http://aws.amazon.com/s3/). It took longer to setup than Github pages, but I figured out a pretty good workflow for setting up sites on S3. I'll write more about that in another post soon.

In the meantime, here are some links:

- [Setting up your Github Pages repo](https://help.github.com/articles/user-organization-and-project-pages).
- [Using Jekyll with Github Pages](https://help.github.com/articles/using-jekyll-with-pages)
- [The Web Ahead: Jekyll and CMS-less websites with Young Hahn and Dave Cole](http://5by5.tv/webahead/54). A great interview with a couple folks from [Development Seed](https://developmentseed.org) about Jekyll.
