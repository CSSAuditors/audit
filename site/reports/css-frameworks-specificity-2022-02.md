---
layout: post
title: The CSS File Size Report for Top CSS Frameworks
description:
image:
date: 2022-01-25
tags:
  # - report
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

{% render report/specificity-list-table, report: report3-specificity %}

{% render report/validator-list-table, report: report3-validator %}
{% render report/validator-count-table, report: report3-validator %}
{% render report/validator-errors-table, report: report3-validator %}
{% render report/validator-warnings-table, report: report3-validator %}


{% render report/extractor-sizes-table, report: report3-extractor %}

{% render report/extractor-sizes-chart, report: report3-extractor, space: 10, height: 2rem %}
{% render report/extractor-list-table, report: report3-extractor, simple: true %}
