---
layout: post
title: How I rewrote the CSS Auditors website
description: In this post, I am going to describe how I rewrote this site.
image: /gfx/on-css-sizes-and-performance-budget.jpg
date: 2022-03-03
permalink: false
eleventyExcludeFromCollections: true
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

When I started building this project, I was focused on creating scripts for CSS reports. Since I am not very good at that, I made a mistake and I included HTML in every response. So, the code for every table and every graph was written in JavaScript. Ouch, I know.

Then I learned about 11ty and its possibilities. At first, I was using 11ty like a regular static site generator. I wasn't aware how powerful and flexible it was.

JSON reports

Liquid

Includes

SCREENSHOT OF A TABLE
SCREENSHOT OF A HIGHCHART

Before: https://web.archive.org/web/20210315134658/https://css-auditors.com/reports/bundesliga-2021-03/
After: https://css-auditors.com/reports/bundesliga-2021-03/

ChartsCSS

