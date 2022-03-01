---
layout: post
title: How I built and rewrote the CSS Auditors website
description: In this post, I am going to describe how I rewrote this site.
image: /gfx/on-css-sizes-and-performance-budget.jpg
date: 2022-03-03
tags:
  - blog
metadata:
  authors:
    - Silvestar
blocks:
  - title: |
      About the Authors
    author: true
  - title: |
      Share on Social Networks
    social: true
  - title: |
      Subscribe
    subscribe: true
    list:
      - description: |
          We are working hard to publish new reports and blog posts as soon as possible.

          If you would like to get recent reports in your inbox, subscribe here!
---

Last year I started this website. It was suppose to be my favorite side project, but, instead, it become my nightmare. Let me tell you why.

## Early days

The idea about this site didn't come over the night. I remember how excited I was to The Project Wallace for the first time and I thought how cool is this and I should use it in my favor somehow. Nothing really happened until I completed [Paul Boag's masterclass “Finding clients”](https://boagworld.com/products/finding-clients/). One of the advices was to combine your favorite hobby or passion and your current skills to get the perfect client or something like that. That made me think about my sports and football, to be more precise, and my strongest skill, CSS. It didn't take to long when I come up with the project: I am going to audit all football clubs' websites and I am going to write about CSS.

Being a worldclass talent that I am, I didn't want to audit these websites manually. So, I started to write these scripts that will scrape all the data about CSS that I could think of: from file sizes to code coverage to warnings and errors. Once I had all the data, all I needed to do is to analyze the data, add some graphs and write the reports.

Since I decided to use 11ty as my static generator, the idea was to use Node.js scripts that will generate tables and graphs and then load them inside 11ty. I created new Liquid filters and then all I needed to do is to use this new shortcode to display graphs and tables. It is worth mentioning that I used Highcharts.js for graphs.

These reports were markdown files but I used only frontmatter part of the markdown. Frontmatter was quite repetitive and ugly because of the indents. When my friend and another CSS Auditor author Ivan wanted to write the next report, he had many problems with the frontmatter syntax. I had to jump in and format everything. I was not happy, not at all.

After this second report, I didn't want to come back to the project for months. Or, when I eventually did, I gave up because I couldn't believe that I created this monster that even I have problems to use.

A new football season started and some clubs left the league and some new ones were promoted, so going forward with the reports seemed even harder.

## New days

Then this winter I started learning about 11ty and its possibilities. It was the time when I unfollowed more than two thousand people from Twitter. One of the first new persons I followed was Zach Leat and his project, 11ty. I saw a lot of retweets, articles, and posts about 11ty. The breakthrough was I figured that I don't need Node.js to give me the HTML code, I need Node.js only to generate JSON files. Then I could use these JSON files inside my Liquid templates to display graphs, tables and other data.



At first, I was using 11ty like a regular static site generator. I wasn't aware how powerful and flexible it was.

JSON reports

Liquid

Includes

SCREENSHOT OF A TABLE
SCREENSHOT OF A HIGHCHART

Before: https://web.archive.org/web/20210315134658/https://css-auditors.com/reports/bundesliga-2021-03/
After: https://css-auditors.com/reports/bundesliga-2021-03/

ChartsCSS

