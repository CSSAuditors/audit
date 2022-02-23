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

TailwindCSS consists of a ton of utility classes, which means there is a class for every single purpose and that's why the full version is so big. It is fair to say that TailwindCSS is not meant to be used in a whole — that is why the latest version unables you to download the whole framework. Instead you need to configure and define untilities that you will actually use.

On the other hand, Pure CSS's site says: “crafted with mobile devices in mind, it was important to us to keep our file sizes small, and every line of CSS was carefully considered.” This should be the right mindset when building a framework — to deliver the least code that could be easily built upon.

{% render report/analyzer-stylesheet-size-chart, report: report3-analyzer-stylesheet %}

Of course, there is a big difference how frameworks should be used and which problems should they solve. Even if we ignore TailwindCSS and focus on next three frameworks, Ant Design, Primer CSS, and Semantic UI, which are over half of megabytes in size, it is still very big difference in the amount of code these frameworks use in comparison to Tachyons and Pure CSS.

An average size of CSS frameworks is almost half of megabyte, which is a lot of CSS code. Although we live in a modern world where half of a megabyte does not mean much for our data plans and our devices, we should all strive to deliver the least possible amount of data in our website. If not because of data plans, then because of [the carbon footprint](https://www.websitecarbon.com/).

### Lines of Code

I thought it would be interesting to examine the number of lines of code.

{% render report/analyzer-stylesheet-loc-chart, report: report3-analyzer-stylesheet %}

Since I analyzed minified versions, we could see that six frameworks deliver a single line of code. Semantic UI delivers no less 362 lines of code in unminified version. It is because it places every component in the new line.

Also, every other framework that has more than one line of code has multiline comments.

Now let's analyze source lines of code. Here's the definition:

> _Source lines of code are counted as the sum of these things:_
>
> - _The number of selectors;_
> - _The number of declarations;_
> - _The number of atrules;_
>
> — <small>[Bart Veneman, Project Wallace](https://www.projectwallace.com/docs/metrics/stylesheets-linesofcode-sourcelinesofcode-total)</small>

{% render report/analyzer-stylesheet-sloc-chart, report: report3-analyzer-stylesheet %}

The whole TailwindCSS has more than 97k source lines of code. The whole Pure CSS has 769 lines of code.

{% render report/analyzer-stylesheet-sloc-table, report: report3-analyzer-stylesheet %}

An average number of source lines of code is more than 17k.

### CSS Comments

Finally, I analyzed the number and the size of comments.

{% render report/analyzer-stylesheet-comment-count-chart, report: report3-analyzer-stylesheet %}

Most frameworks have less than 6 comments. Semantic UI and TailwindCSS have 46 and 280, respectively. Halfmoon doesn't have any comments.

{% render report/analyzer-stylesheet-comment-count-table, report: report3-analyzer-stylesheet %}

Although comments are usually useful, I don't think there should be more than one comment in minified versions. Since today we have tools to strip comments from the code, I am not sure why some frameworks don't do it.

{% render report/analyzer-stylesheet-comment-size-chart, report: report3-analyzer-stylesheet %}

Every framework has less than 500 bytes of comments, with the exception of Semantic UI. It has more than 7 kilobytes of code. Semantic UI is the second in the file size with more than 600 kilobytes. Compared to that, ~7 kilobytes is not a big number.

{% render report/analyzer-stylesheet-comment-size-table, report: report3-analyzer-stylesheet %}

## The Conclusion

It is fair to say that these frameworks are not meant to be used in whole. Every developer should cherry-pick components, utilities, and features that are will be actually used in the project. But let's face it, there are a lot of people out there that will include the full framework to the site.

Either way, just like in previous posts about file size in [Premier League](/reports/premier-league-2021-02/) and [Bundesliga](/reports/bundesliga-2021-03/) sizes, I wanted to bring to attention the size of CSS files. Let's make them smaller and let's make our users and our planet happier.
