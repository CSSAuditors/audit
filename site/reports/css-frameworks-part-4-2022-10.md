---
layout: post
title: 'Top 2021 CSS Frameworks Report, Part 4: Specificity and complexity'
# description: In this report, I have audited top CSS frameworks of 2022, according to the State of CSS report, for errors and warnings.
# image: /gfx/css-frameworks-part-2-2022-05.jpg
permalink: false
date: 2022-10-20
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

This is the third part of the **Top CSS Frameworks of 2022** report. Read the previous reports about [about the file sizes](/reports/css-frameworks-part-1-2022-02/) and [errors and warning](/reports/css-frameworks-part-2-2022-05/).

In this report, I have audited top CSS frameworks ([according to the State of CSS report](https://2021.stateofcss.com/en-US/technologies/css-frameworks)) ... Here’s the complete list of audited frameworks:

{% render report/general-site-list, report: reports.report3 %}

<small>⚠️ It is worth noting that I had to use the previous version of the TailwindCSS since I could not download the latest one in full.</small>

## The Tooling

For this report, I used the following tools:

- [CSS Analyzer](https://www.npmjs.com/package/@projectwallace/css-analyzer)

Using this tool, I have been able to gather information about selectors, specificity, and complexity of CSS selectors.

<small>⚠️ Any errors in the report that might be caused by invalid software are not deliberate and should be considered involuntary.</small>

## The Report

### Selectors

CSS selectors are used to define which elements should the rules be aplied to. Let's see which CSS frameworks have the most and which ones have the least number of selectors:

{% render report/selectors-count-all-table, report: report3-analyzer-selectors %}

As expected, TailwindCSS has the most selectors. TailwindCSS is the utility-first CSS framework which means that every class serves as a single purpose. On the other hand, PureCSS has the least selectors.


{% render report/selectors-list-chart, report: report3-analyzer-selectors %}

We could consider these two frameworks as extremes. Every other framework have between ~2k and ~9k selectors.

### Specificity

CSS specificity is the algorithm which browsers use to determine the “weight” of the selector. It is believed that “lighter” selectors are easier to maintain and comprehend.

{% render report/specificity-count-table, report: report3-analyzer-selectors %}

As we see, Materialize has the highest specificity selector and Tachyons has the lower highest specificity. Materialize is the only CSS framework which uses ID selectors, which I find very odd.

{% render report/specificity-count-list, report: report3-analyzer-selectors %}

Almost every frameworks' max specificity depend mostly on classes. That doesn't surprise, since classes are the most common way to style HTML elements these days.

Here are the final numbers about complexity:

{% render report/complexity-count-table, report: report3-analyzer-selectors %}


...

[#RespectCSS](https://twitter.com/search?q=%23RespectCSS&src=typed_query)

## Related resources

- Report: [Top 2021 CSS Frameworks Report, Part 1: The CSS File Sizes](/reports/css-frameworks-part-1-2022-02/)
- Report: [Top 2021 CSS Frameworks Report, Part 2: Validation](/reports/css-frameworks-part-2-2022-05/)
