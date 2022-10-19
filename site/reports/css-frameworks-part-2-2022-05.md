---
layout: post
title: 'Top 2021 CSS Frameworks Report, Part 2: Validation'
description: In this report, I have audited top CSS frameworks of 2022 (according to the State of CSS report) for errors and warnings.
image: /gfx/css-frameworks-part-2-2022-05.jpg
date: 2022-05-06
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

This is the second part of the **Top CSS Frameworks of 2022** report. [Here’s the first part of the report about the file sizes](/reports/css-frameworks-part-1-2022-02/).

In this report, I have audited top CSS frameworks ([according to the State of CSS report](https://2021.stateofcss.com/en-US/technologies/css-frameworks)) for errors and warnings. Here’s the complete list of audited frameworks:

{% render report/general-site-list, report: reports.report3 %}

<small>⚠️ It is worth noting that I had to use the previous version of the TailwindCSS since I could not download the latest one in full.</small>

## The Tooling

For this report, I used the following tools:

- [css-validator](https://github.com/twolfson/css-validator)

Using this tool, I validated CSS code against [the W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/). In addition, all errors and warnings are validated against the css3svg profile.

<small>⚠️ Any errors in the report that might be caused by invalid software are not deliberate and should be considered involuntary.</small>

## The Report

Here are the final numbers:

{% render report/validator-list-table, report: report3-validator %}

### Errors

Let’s start with frameworks that did a good job and that don’t have any errors in code:

- Bootstrap
- Pure CSS
- Tachyons
- TailwindCSS
- UIkit

When using a framework, you expect to get the code without errors, but only 7 out of 12 CSS frameworks deliver error-free code.

The rest of the frameworks have at least one error. Two frameworks with the most errors are Semantic UI and Primer CSS. Semantic UI has around 100 errors, of which 78 are related to invalid values.

Primer CSS has no less than 4025 errors! The majority of these errors are related to a strange snippet that looks like JavaScript code that is included in the code a few thousand times: `(obj) => get_1.default(obj, path)`. Since I audited an earlier version of the framework, [19.2.0, in January](https://github.com/primer/css/releases/tag/v19.2.0), I checked again with the latest version, [19.8.2](https://github.com/primer/css/releases/tag/v19.8.2). To my surprise, there were even more errors, [shocking 5268 errors](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Funpkg.com%2F%40primer%2Fcss%4019.8.2%2Fdist%2Fprimer.css&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en).

{% render report/validator-error-count-table, report: report3-validator %}

The average number of errors is 346, and the median is 13.

### Error types

These are the discovered types of errors:

{% render report/validator-errors-list, report: report3-validator %}

<small>⚠️ Note that this is my interpretation of error meanings. Unfortunately, I couldn’t find the official list of all errors described in detail.</small>

According to the [W3C CSS Validation Service translation keys](https://jigsaw.w3.org/css-validator/translations.html), many different errors could occur (more than 80), and the parser found only nine different ones when validating these frameworks. Here’s the list of all error types by CSS framework:

{% render report/validator-error-sites-table, report: report3-validator %}

Most of the errors are related to values — either the values are out of range (negative values), zero value has a unit when it shouldn’t, or the value is invalid. The other three error types are a general error when the parser cannot read the line and an error when a property doesn’t exist. It is worth noting that the css-validator tool reported the following CSS properties as non-existing:

- [font-smoothing](https://caniuse.com/?search=font-smoothing)
- [tap-highlight-color](https://caniuse.com/?search=tap-highlight-color)
- [font-variant](https://caniuse.com/?search=font-variant)
- [text-decoration](https://caniuse.com/?search=text-decoration)
- [text-transform](https://caniuse.com/?search=text-transform)

The font-smoothing property actually doesn’t exist, but tap-highlight-color does, but it is a non-standard property. The rest of the properties exist but are not supported in the “CSS Level 3 + SVG” profile. I think it has to do with the SVG part since these are supported in other profiles.

## Warnings

Every validated CSS framework has at least a few dozens of warnings, but there are only two frameworks with less than a hundred warnings: Pure CSS and Tachyons. On the other hand, there are two frameworks with more than a thousand warnings: Halfmoon and Semantic UI. The rest are between these two values with an average of 507 warnings.

{% render report/validator-warning-count-table, report: report3-validator %}

### Warning types

The parser found 14 different warnings. Here’s the list with explanations:

{% render report/validator-warnings-list, report: report3-validator %}

<small>⚠️ Note that this is my interpretation of warning meanings. Unfortunately, I couldn’t find the official list of all warnings described in detail.</small>

Although most of these warnings could be ignored, I found them really insightful. For example, I noticed that every framework uses prefixed properties, pseudo-elements, and pseudo-classes. I also discovered that only five frameworks use CSS variables, and three use CSS hacks. And did you know that Semantic UI imports Lato font from Google Fonts? I didn’t, and I couldn’t figure out why.

I also noticed that the parser complained about the `clip` property for the deprecated value warning. I found out that the property is indeed deprecated, [according to caniuse](https://caniuse.com/mdn-css_properties_clip). The parser also complained about the `auto` value for the `pointer-events` property for the unofficial value warning. I didn’t know that the auto value is not officially supported. Finally, I noticed that the parser complained about the `transition` property in the `@media print` rule. It makes sense not to include transitions when printing.

{% render report/validator-warning-sites-table, report: report3-validator %}

## The Conclusion

I must admit I didn’t use the css-validator service very often. It was too time-consuming to go through all errors and warnings and try to fix them. After all, the code worked thanks to the forgiving nature of the CSS.

But what would happen if the browser breaks when it finds an error in CSS? Imagine how many sites would stop working. We complain about CSS all the time, but CSS is too kind to us. It lets us make mistakes unpunished.

Now, go ahead and test your site against [the W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/) and see how many errors and warnings do you have. I was surprised that [my personal site has zero errors and warnings](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fwww.silvestar.codes%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en). And if you are wondering if this site has any errors, [it doesn’t](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fwww.css-auditors.com%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en).

[#RespectCSS](https://twitter.com/search?q=%23RespectCSS&src=typed_query)

## Related resources

- Report: [Top 2021 CSS Frameworks Report, Part 1: The CSS File Sizes](/reports/css-frameworks-part-1-2022-02/)
