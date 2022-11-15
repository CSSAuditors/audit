---
layout: post
title: 'Top 2021 CSS Frameworks Report, Part 4: Specificity and complexity'
description: In this report, I have audited Top CSS Frameworks of 2021, according to the State of CSS report, for specificity and complexity.
image: /gfx/css-frameworks-part-4-2022-11.jpg
date: 2022-11-15
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

This is the fourth part of the **Top CSS Frameworks of 2021** report. Read the previous reports about [the file sizes](/reports/css-frameworks-part-1-2022-02/), [errors and warning](/reports/css-frameworks-part-2-2022-05/), and [selectors](/reports/css-frameworks-part-3-2022-10/).

In this report, I have audited top CSS frameworks ([according to the State of CSS report](https://2021.stateofcss.com/en-US/technologies/css-frameworks)) for specificity and complexity. Here’s the complete list of audited frameworks:

{% render report/general-site-list, report: reports.report3 %}

<small>⚠️ It is worth noting that I had to use the previous version of the TailwindCSS since I could not download the latest one in full.</small>

## The Tooling

For this report, I used the following tools:

- [CSS Analyzer](https://www.npmjs.com/package/@projectwallace/css-analyzer)

Using this tool, I have been able to gather information about selectors, specificity, and complexity of CSS selectors.

<small>⚠️ Any errors in the report that might be caused by invalid software are not deliberate and should be considered involuntary.</small>

## The Report
### Specificity

CSS specificity is the algorithm which browsers use to determine the “weight” of the selector. It is believed that “lighter” selectors are easier to maintain and comprehend.

{% render report/specificity-count-table, report: report3-analyzer-selectors %}

As we see, Materialize has the highest specificity selector and Tachyons has the lowest high specificity. Materialize is the only CSS framework which uses ID selectors, which I find very odd.

TailwindCSS has the lowest maximum specificity, which is expected with it being the utility class framework.

{% render report/specificity-count-list, report: report3-analyzer-selectors %}

Almost every frameworks' max specificity depend mostly on classes. That doesn't surprise, since classes are the most common way to style HTML elements these days.

### Complexity

CSS specificity tells us how “heavy” our selectors are. As [Bart Veneman explained in his article](https://www.projectwallace.com/blog/css-complexity), specificity could be handled with the new `:where()` and `:is()` selectors which lowers the specificity, but adds to complexity which leads to more problems.

> Some recent additions to CSS have made it easier to deal with specificity issues, like :where() and :is(). But they can make selectors more **complex**.
>
> — [Bart Veneman](https://www.projectwallace.com/blog/css-complexity)

In case of CSS complexity, the biggest problems are usually related to debugging. Now that we know what CSS complexity is, let's see the maximum complexity for each framework:

{% render report/complexity-count-list, report: report3-analyzer-selectors %}


CSS complexity is defined as a whole number. The higher the number, the higher the complexity.

We could see that the two thirds of CSS frameworks have the maximum complexity in double-digits. That doesn't sound ideal, far from it. On the other hand, an average complexity is usually 1, 3, or 5. That sounds much more optimistic.

{% render report/complexity-count-table, report: report3-analyzer-selectors %}

Semantic UI has the highest complexity selector of 19, while Tachyons has the lowest, just 5. Average complexity is quite good overall, just 3.15.

## Conclusion

CSS specificity is a long know metric, which is usually ignored by most developers. Now we have another CSS metric that might be ignored, CSS complexity.

While CSS specificity and complexity are just numbers, they could help us understand the quality of the framework. If you are going to use CSS framework as a base for your project and you think you will need to overwrite its selectors, these numbers might be quite helpful.

So, do your part and share these findings to bring the attention to CSS code quality.

[#RespectCSS](https://twitter.com/search?q=%23RespectCSS&src=typed_query)

## Related resources

- Report: [Top 2021 CSS Frameworks Report, Part 1: The CSS File Sizes](/reports/css-frameworks-part-1-2022-02/)
- Report: [Top 2021 CSS Frameworks Report, Part 2: Validation](/reports/css-frameworks-part-2-2022-05/)
- Report: [Top 2021 CSS Frameworks Report, Part 3: Selectors](/reports/css-frameworks-part-3-2022-10/)
