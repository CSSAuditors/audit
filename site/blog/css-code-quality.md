---
layout: post
title: Find out the quality of your CSS code
description:
# image: /gfx/
date: 2022-10-15
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

Last year I wrote [an article about tools for auditing CSS](https://css-tricks.com/tools-for-auditing-css/). If you are a CSS lover, I bet you have heard some of those.

But did you know there is a tool called CSS Code Quality that is free to use and gives your CSS a score?

## About the tool

[CSS Code Quality](https://www.projectwallace.com/css-code-quality) is a tool made by Bart Veneman. As [Bart says in his blog post](https://www.projectwallace.com/blog/new-online-css-code-quality-analyzer), “think @____lighthouse, but for CSS specifically.”

## How it works

After you submit either your URL or CSS code, you get the scores for the following:

- maintainability,
- complexity, and
- performance.

The maximum score is 100. Like the Lighthouse tool, your code is doing great if you get the green scores.

![Screenshot of CSS Code Quality scores for MDN site.](/gfx/css-code-quality-mdn-screenshot.png)

_I wouldn’t mind seeing a legend telling you that 100 points are the maximum, though._

## Score breakdown

For every test that fails, your score gets lower. You can see the results for each test in the score breakdown.

There are twenty different tests at the time of writing, from checking the usage of @import in your code to checking the number of declarations in a single ruleset.

If your code passes the test, the test will be marked green. Otherwise, if your code didn’t pass the test, the test will be marked orange or red, depending on how badly the code broke the test.

For example, the MDN site gets a red score for the “Avoid many Declarations in a single RuleSet” test because there is a ruleset with 106 declarations (!!). Similarly, the MDN site gets an orange score for “More than most common Selector Complexity” because 38.9% of selector complexities are more complex than most common.

![Screenshot of CSS Code Quality score breakdown for MDN site.](/gfx/css-code-quality-mdn-screenshot2.png)

It would be great if you could see these test fails highlighted in your CSS code somehow, but this information is helpful as it is already.

You could even download the results as a JSON file for future reference.

## Conclusion

Writing **good** CSS is hard. At least now we could get a sense of how good or bad we are at it. So check [CSS Code Quality](https://www.projectwallace.com/css-code-quality) today and improve your CSS!

[#RespectCSS](https://twitter.com/search?q=%23RespectCSS&src=typed_query)
