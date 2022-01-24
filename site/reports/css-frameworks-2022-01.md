---
layout: post
title: The CSS File Size and Count Report for Top CSS Frameworks
description:
image:
date: 2022-01-25
tags:
  - report
metadata:
  authors:
    - Silvestar
blocks:
  - title: |
      About the Author
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

{% render report/validator-all, report: report3-validator %}

{% render report/site-list, report: reports.report3 %}
{% render report/file-sizes, report: report3-extractor %}

Pure CSS is ridiculously tiny, as they website says.

TailwindCSS gzip is pretty big, unsurprisingly. Gzip doesn't do well on non-repeating strings, and TailwindCSS has only unique declarations (?).

{% render report/chart-sizes, report: report3-extractor, space: 10, height: 2rem %}
{% render report/full-report, report: report3-extractor, simple: true %}
