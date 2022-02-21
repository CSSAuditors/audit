---
layout: post
title: The CSS File Size Report for Top CSS Frameworks
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

In this report, we audited top CSS frameworks [according to the State of CSS report](https://2021.stateofcss.com/en-US/technologies/css-frameworks). Here's the full list:

{% render report/general-site-list, report: reports.report3 %}

It is worthh noting that we analyzed minified versions.

<small>⚠️ We had to use the previous version of the TailwindCSS, since we could not download the latest one in full.</small>

## The Tooling

For this report, we used the following tools:

- [extract-css-core](https://github.com/projectwallace/extract-css-core)
- [@projectwallace/css-analyzer](https://github.com/projectwallace/css-analyzer)

Using these tools, we extracted and analyzed CSS sizes and we found out some interesting things.

<small>⚠️ Any errors in the report that might be caused by invalid software are not deliberate and should be considered as such.</small>

## The CSS File Sizes

Here are the final numbers:

{% render report/analyzer-stylesheet-list-table, report: report3-analyzer-stylesheet %}

### The Findings

Unsurprisingly, TailwindCSS is the biggest in size while Pure CSS is “ridiculously tiny,” just like its website says.

{% render report/analyzer-stylesheet-size-table, report: report3-analyzer-stylesheet %}

TailwindCSS consists of a ton of utility classes, which means there is a class for a single purpose and that results in a very big file. It is fair to say that TailwindCSS is not meant to be used in a whole — that is why the new version unables you to use the whole framework. Instead you need to configure and define untilities that you will actually use.

On the other hand, Pure CSS's site says that it was “crafted with mobile devices in mind, it was important to us to keep our file sizes small, and every line of CSS was carefully considered.” This should be the right mindset when building a framework — to deliver the least code that could be easily built upon.

{% render report/analyzer-stylesheet-size-chart, report: report3-analyzer-stylesheet %}

Of course, there is a big difference how frameworks should be used and which problems should they solve. Even if we ignore TailwindCSS and focus on next three frameworks, they are all over half of megabytes in size, it is still very big difference in the amount of code these frameworks use in comparison to Tachyons and Pure CSS.

If we take a look at the average size of CSS frameworks, it is almost half of megabyte, which is a lot of CSS code. Although we live in a modern world where half of megabyte is a not much in terms of data plans, but we should all strive to deliver least amount of data in our website. If not because of data plans, then because of carbon footprints.

We could definitively do better.

### Lines of Code

We thought it would be interesting to examine the number of lines of code.

{% render report/analyzer-stylesheet-sloc-chart, report: report3-analyzer-stylesheet %}

There is nothing shocking here — the graph is analog to CSS sizes.

{% render report/analyzer-stylesheet-sloc-table, report: report3-analyzer-stylesheet %}

{% render report/analyzer-stylesheet-loc-table, report: report3-analyzer-stylesheet %}

{% render report/analyzer-stylesheet-loc-chart, report: report3-analyzer-stylesheet %}

### CSS Comments

Finally, we analyzed the number and the size of comments.

{% render report/analyzer-stylesheet-comment-count-chart, report: report3-analyzer-stylesheet %}

Most frameworks have less than 6 comments. Semantic UI and TailwindCSS have 46 and 280, respectively.

{% render report/analyzer-stylesheet-comment-count-table, report: report3-analyzer-stylesheet %}

{% render report/analyzer-stylesheet-comment-size-chart, report: report3-analyzer-stylesheet %}

{% render report/analyzer-stylesheet-comment-size-table, report: report3-analyzer-stylesheet %}



{% render report/specificity-list-table, report: report3-specificity %}

{% render report/validator-list-table, report: report3-validator %}
{% render report/validator-count-table, report: report3-validator %}
{% render report/validator-errors-table, report: report3-validator %}
{% render report/validator-warnings-table, report: report3-validator %}


{% render report/extractor-sizes-table, report: report3-extractor %}

{% render report/extractor-sizes-chart, report: report3-extractor, space: 10, height: 2rem %}
{% render report/extractor-list-table, report: report3-extractor, simple: true %}
