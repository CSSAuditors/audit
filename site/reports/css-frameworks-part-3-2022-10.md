---
layout: post
title: 'Top 2021 CSS Frameworks Report, Part 3: Selectors'
description: In this report, I have audited top CSS frameworks of 2022, according to the State of CSS report, against selectors.
image: /gfx/css-frameworks-part-3-2022-10.jpg
date: 2022-10-19
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

This is the third part of the **Top CSS Frameworks of 2022** report. Read the previous reports about [the file sizes](/reports/css-frameworks-part-1-2022-02/) and [errors and warnings](/reports/css-frameworks-part-2-2022-05/).

In this report, I have audited top CSS frameworks ([according to the State of CSS report](https://2021.stateofcss.com/en-US/technologies/css-frameworks)) against selectors. Here’s the complete list of audited frameworks:

{% render report/general-site-list, report: reports.report3 %}

<small>⚠️ It is worth noting that I had to use the previous version of the TailwindCSS since I could not download the latest one in full.</small>

## The Tooling

For this report, I used the following tools:

- [CSS Analyzer](https://www.npmjs.com/package/@projectwallace/css-analyzer)

Using this tool, I have gathered some intriguing information about CSS selectors.

<small>⚠️ Any errors in the report that might be caused by invalid software are not deliberate and should be considered involuntary.</small>

## The Report

CSS selectors define which elements the rules should be applied to.

{% render report/selectors-count-all-table, report: report3-analyzer-selectors %}

As expected, TailwindCSS has the most selectors. TailwindCSS is the utility-first CSS framework, meaning every class serves a single purpose. On the other hand, PureCSS has the least selectors. That is expected since PureCSS tends to serve CSS with a minimal footprint. We could consider these two frameworks as extremes. Every other framework has between ~2k and ~9k selectors.

{% render report/selectors-list-chart, report: report3-analyzer-selectors %}

### ID selectors

ID selectors contain HTML id attributes. They are often considered undesirable and too specific.

{% render report/selectors-count-id-table, report: report3-analyzer-selectors %}

Only Materialize uses ID selectors. I find that very odd, especially when we inspect which selectors are in question:

- `#toast-container`,
- `#materialbox-overlay`, and
- `#spinnerContainer.cooldown`.

My opinion is that any ID selector shouldn’t be part of CSS frameworks.

### Keyframes selectors

Keyframes selectors could be considered as CSS animation definitions.

{% render report/selectors-count-keyframes-table, report: report3-analyzer-selectors %}

Semantic UI framework has the most keyframes selectors. Although there are 370 keyframes selectors, only ~5% are unique. For example, there are at least six keyframes selectors that have the same code:

- `@keyframes button-spin`,
- `@keyframes icon-loading`,
- `@keyframes loader`,
- `@keyframes segment-spin`,
- `@keyframes form-spin`, and
- `@keyframes dropdown-spin`.

My gut is telling me there should be only one reusable definition in this case.

Other frameworks don't have this problem.

{% render report/selectors-list-keyframes-table, report: report3-analyzer-selectors %}

Three CSS frameworks don’t have keyframes selectors: PureCSS, Tachyons, and Foundation. That is fine. CSS animations could be considered progressive enhancement anyway. What is more interesting is that only Bootstrap and PrimerCSS take advantage of the `prefers-reduced-motion` feature for detecting users’ settings for reduced motion. The only difference is that Bootstrap removes animations with the `prefers-reduced-motion: reduce` selector, and PrimerCSS adds animations with the `prefers-reduced-motion: no-preference` selector.

The positive thing about CSS animations is that animated properties are mainly the most convenient ones: transforms and opacity. I saw some other properties, like `perspective` and `box-shadow`, but it wasn’t a common occurrence.

### A11y selectors

Accessibility or a11y selectors are related to accessibility features.

{% render report/selectors-count-a11y-table, report: report3-analyzer-selectors %}

According to CSS Analyzer, Primer CSS has the most a11y selectors, which is admirable. Indeed, if we take a closer look, we would find the following selectors:

```css
[aria-expanded]
[aria-expanded=true]
[aria-expanded=false]
[aria-level="1"]
[aria-checked=true]
[aria-checked=false]
[aria-selected=true]
[aria-selected=false]
[aria-disabled=true]
[aria-current]:not([aria-current=false])
```

All these selectors point out that Primer CSS is built with accessibility awareness.

{% render report/selectors-list-a11y-table, report: report3-analyzer-selectors %}

Six CSS frameworks don’t have any a11y selector. Although some others have at least one, I am not convinced that accessibility was vital to these frameworks. For example, UIkit has 24 a11y selectors, but they take advantage only of the `[aria-expanded=true]` selector. That is not enough.

## The Conclusion

CSS Analyzer is an exciting tool. It reveals all sorts of interesting metrics. For example, by inspecting a11y selectors, we might know whether accessibility is considered or not. Or we could find how many CSS animation definitions there are. By applying more effort, we could determine if the CSS code respects the user’s settings for reduced motion. There are many other metrics that I will be exploring in future articles.

If you are interested in how your CSS code performs, use the free [CSS Analyzer](https://www.projectwallace.com/analyze-css) online tool, [register](https://www.projectwallace.com/register) and take advantage of all features, or use [the free CLI tool](https://www.npmjs.com/package/@projectwallace/css-analyzer).

[#RespectCSS](https://twitter.com/search?q=%23RespectCSS&src=typed_query)

## Related resources

- Report: [Top 2021 CSS Frameworks Report, Part 1: The CSS File Sizes](/reports/css-frameworks-part-1-2022-02/)
- Report: [Top 2021 CSS Frameworks Report, Part 2: Validation](/reports/css-frameworks-part-2-2022-05/)
