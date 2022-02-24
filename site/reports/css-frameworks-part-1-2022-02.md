---
layout: post
title: 'Top 2021 CSS Frameworks Report, Part 1: The CSS File Sizes'
description: In this report, I have audited top CSS frameworks according to the State of CSS report. Find out all about file sizes of these CSS frameworks.
image: gfx/css-frameworks-part-1-2022-02.jpg
date: 2022-02-26
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

In this report, I have audited top CSS frameworks [according to the State of CSS report](https://2021.stateofcss.com/en-US/technologies/css-frameworks). Here's the full list:

{% render report/general-site-list, report: reports.report3 %}

<small>⚠️ It is worth noting that I analyzed full minified versions of every framework. I had to use the previous version of the TailwindCSS, since I could not download the latest one in full.</small>

## The Tooling

For this report, I used the following tools:

- [extract-css-core](https://github.com/projectwallace/extract-css-core)
- [@projectwallace/css-analyzer](https://github.com/projectwallace/css-analyzer)

Using these tools, I extracted and analyzed CSS sizes and I found out some interesting things.

<small>⚠️ Any errors in the report that might be caused by invalid software are not deliberate and should be considered as such.</small>

## The Report

Here are the final numbers:

{% render report/analyzer-stylesheet-list-table, report: report3-analyzer-stylesheet %}

### File Sizes

Unsurprisingly, TailwindCSS is the biggest in size while Pure CSS is “ridiculously tiny,” just like its website says.

{% render report/analyzer-stylesheet-size-table, report: report3-analyzer-stylesheet %}

TailwindCSS consists of a ton of utility classes, which means there is a class for every single purpose and that's why the full version is so big. It is fair to say that TailwindCSS is not meant to be used in a whole — that is why the latest version unables you to download the whole framework. Instead you need to configure and define utilities that you will actually use.

On the other hand, Pure CSS's site says: “crafted with mobile devices in mind, it was important to us to keep our file sizes small, and every line of CSS was carefully considered.” That is some healthy mindset when building a framework — to deliver the least code that could be easily built upon.

{% render report/analyzer-stylesheet-size-chart, report: report3-analyzer-stylesheet %}

Of course, there is a big difference how frameworks should be used and which problems should they solve. Even if we ignore TailwindCSS and focus on next three frameworks, Ant Design, Primer CSS, and Semantic UI, which are over half of a megabyte in size, it is still very big difference in the amount of code these frameworks use in comparison to Tachyons and Pure CSS.

An average size of CSS frameworks is almost half of a megabyte, which is a lot of CSS code. Although we live in a modern world where half of a megabyte does not mean much for our data plans and our devices, we should all strive to deliver the least possible amount of data in our website. If not because of our data plans, then because of [the carbon footprint](https://www.websitecarbon.com/).

### Lines of Code

Analyzing only file sizes might not be that exciting, so I thought it would be interesting to examine the number of lines of code.

{% render report/analyzer-stylesheet-loc-chart, report: report3-analyzer-stylesheet %}

Since I analyzed only minified versions, we could see that six frameworks deliver a single line of code. That is what most of us expect when talking about minified code. But Semantic UI delivers no less than 362 lines of code in minified version. That is a lot. The reason is because it places the code for every component in the new line.

Speaking of new lines, every framework that has more than one line of code has multiline comments.

### Source Lines of Code

Now let's analyze source lines of code. In case you are wondering what are source lines of code, here's the definition:

> _Source lines of code are counted as the sum of these things:_
>
> - _The number of selectors;_
> - _The number of declarations;_
> - _The number of atrules;_
>
> — <small>[Bart Veneman, Project Wallace](https://www.projectwallace.com/docs/metrics/stylesheets-linesofcode-sourcelinesofcode-total)</small>

{% render report/analyzer-stylesheet-sloc-chart, report: report3-analyzer-stylesheet %}

Since TailwindCSS has a new class for every purpose, it doesn't surprise to see that it has more than 97k source lines of code. Again, Pure CSS has the fewest source lines of code — only 769.

{% render report/analyzer-stylesheet-sloc-table, report: report3-analyzer-stylesheet %}

An average number of source lines of code is more than 17k. That is seventeen thousand selectors, declarations and atrules.

### CSS Comments

Finally, I analyzed the number and the size of comments.

{% render report/analyzer-stylesheet-comment-count-chart, report: report3-analyzer-stylesheet %}

Most frameworks have less than seven comments. That is expected, since I analyzed minified versions of every framework. Semantic UI and TailwindCSS have 46 and 280, respectively.

{% render report/analyzer-stylesheet-comment-count-table, report: report3-analyzer-stylesheet %}

Although comments are usually useful and welcome in the code, I don't think there should be more than one comment in minified versions. For example, minified Halfmoon doesn't have any comments. Since today's tools are able to strip comments from the code, I am not sure why some frameworks don't do it.

{% render report/analyzer-stylesheet-comment-size-chart, report: report3-analyzer-stylesheet %}

When talking about the size of comments, every framework has less than 503 bytes of comments, with the exception of Semantic UI. It has more than 7 kilobytes of comments. Since Semantic UI is the second in the file size with more than 600 kilobytes, ~7 kilobytes doesn't seem like a big number, but it is.

{% render report/analyzer-stylesheet-comment-size-table, report: report3-analyzer-stylesheet %}

## The Conclusion

Most frameworks are not meant to be used in a whole. Every developer should cherry-pick components, utilities, and features that are will be actually used in the project. But let's face it, there are a lot of people out there that will include the full framework to the site. So making a framework lighter should be the priority.

Not only that, bigger CSS means more job for browser. Although modern devices don't have problems with that, it affects your Core Web Vitals score and that affects your Google score. So it makes sense to pay attention to the CSS size.

So, just like in previous posts about file size in [Premier League](/reports/premier-league-2021-02/) and [Bundesliga](/reports/bundesliga-2021-03/) sites, I wanted to bring to attention the size of CSS files. Let's make them smaller and let's make our users and our planet happier.
