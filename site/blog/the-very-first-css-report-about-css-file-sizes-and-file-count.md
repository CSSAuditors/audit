---
layout: post
title: The Very First CSS Report About CSS File Sizes and File Count
description: Learn how and why we started this site and how we published our first report about file sizes in Premier League sites.
image: /gfx/the-very-first-css-report-about-css-file-sizes-and-file-count.jpg
date: 2021-02-18
tags:
  - blog
metadata:
  authors:
    - Silvestar
# blocks:
#   - title: |
#       The Very First CSS Report About CSS File Sizes and File Count
#     details: true
#   - title: |
#       How It Started
#     list:
#       - description: |
#           Last year I took [a masterclass](https://boagworld.com/academy/finding-clients/) on finding clients by Paul Boag. I never got to the final lesson, but one particular advice stuck with me: you should combine your passion with your profession. So I started thinking about combining sports, my passion, and front-end development, to be more precise, CSS, my profession. Since I enjoy writing CSS and exploring it and finding new ways to use it more efficiently, I got the idea of starting a site about auditing CSS. I presented the idea to my friend, and here we are now, providing our first report.
#   - title: |
#       About CSS Audit
#     list:
#       - description: |
#           CSS auditing is not a very popular topic, but we find it very important. Although there are some excellent tools and resources, we don’t think those are widespread enough. One of the aims of CSS Auditors is to try to change that. We want to bring attention to CSS and all aspects of writing quality CSS code. After all, every site on earth uses CSS, with very few exceptions [like this one](https://motherfuckingwebsite.com/).

#           [Wikipedia](https://en.wikipedia.org/wiki/Code_audit) has this definition for code audit:

#           > A software code audit is a comprehensive analysis of source code in a programming project with the intent of discovering bugs, security breaches or violations of programming conventions.

#           CSS is a very forgiving language in terms of errors. The reason is that browsers usually skip the line that produces the error while the rest of the code remains valid. There are linters and other tools that could prevent those issues. Still, they cannot prevent developers from writing inadequate CSS. That is why we would like to add [u]CSS code quality[\u] to this definition.
#   - title: |
#       About CSS Quality
#     list:
#       - description: |
#           With abstract terms, like quality, it is almost impossible to determine the formula or calculation. How would you define code quality, in particular, CSS code quality? We asked this question in several places, including [dev.to](https://dev.to/starbist/how-to-measure-determine-the-quality-of-the-css-code-1f48) and some Slack communities. Here are some of the answers:
#       - quote:
#           text: |
#             As some of the previous answers mention:

#             - Low specificity selectors

#             - Component-based styles
#           author: Spyros
#       - quote:
#           text: |
#             If the css is modular, reusable and scalable.

#             How large the custom stylesheet is in terms of file-size.

#             Use of external css frameworks like Bootstrap or Foundation.

#             For large projects, if a preprocessor like Sass or Less is being implemented with properly organized functions, mixins, variables, etc.
#           author: Matt
#       - quote:
#           text: |
#             - Usage of low/high specificity selectors.

#             - Styles with less noise

#             - Readable styles (is readable top to bottom)

#             Forgotten that !important still exists.
#           author: Joshua
#       - quote:
#           text: |
#             Readability, structure, good use of variables and consistency. The bigger the project, the more important these are to me.  Also the lack of exceptions although this might be more of a bad design practice...
#           author: Sjoerd
#       - quote:
#           text: |
#             - No bootstrap

#             - Mostly max 3 selectors ( in case of sass, 3 levels of nesting )

#             - Dry

#             - Ordered declarations

#             - Use of not, >, +, ~

#             - Comments

#             - Naming of classes (understandable)

#             - Reduced motion, outline not 0, etc. (Accessibility)

#             - Animation

#             - Transform

#             - No backend developer code
#           author: Kris
#       - quote:
#           text: |
#             - Performance considerations. e.g. using will-change property when animating.

#             - Considered use of when to animate with CSS vs JS

#             - Consistent coding patterns e.g. always use shorthand where appropriate.

#             Other things I’d look at have already been mentioned.
#           author: Azlan
#       - description: |
#           There seems to be no answer to what CSS code quality implies. Everyone’s answer is different, and it depends on various aspects.
#   - title: |
#       The Very First Audit Report
#     list:
#       - description: |
#           One of the first thing that comes to mind when thinking about the quality of the code is file size. That is exactly what we did in our first report – we audited the CSS code of all Premier League sites. This is the part where I managed to include my passion, sports, into the project.

#           The full report is available [here](/reports/premier-league-2021-02/). I don’t want to write any spoilers, so I will leave you to read it thoroughly.

#           To be able to make this report, we needed information. So the first step was to extract the CSS code from these sites. We used [wappalyzer](https://github.com/aliasio/wappalyzer) and [extract-css-core](https://github.com/bartveneman/extract-css-core), both excellent tools. We didn’t want to make calculations manually since we wanted to reuse the script to audit other sites, so we wrote a script for calculations and graphs. Finally, we needed to make the report look appealing. This is definitively the part that could use more love, but we wanted to release the report as soon as possible.
#   - title: |
#       The Conclusion
#     list:
#       - description: |
#           We hope this report will encourage you to think about your CSS code’s size and CSS quality in general.

#           That is the final goal of CSS Auditors; we want to make every developer respect CSS.

#           [#RespectCSS](https://twitter.com/search?q=%23RespectCSS&src=typed_query)
#   - title: |
#       Related resources
#     list:
#       - description: |
#           - Report: [The CSS File Size and Count Report for Premier League sites](/reports/premier-league-2021-02/)
#           - Report: [The CSS File Size and Count Report for Bundesliga sites](/reports/bundesliga-2021-03/)
#           - Article: [On CSS sizes and performance budget](/blog/the-second-css-report-about-css-file-sizes-and-file-count/)
#   - title: |
#       About the Author
#     author: true
#   - title: |
#       Share on Social Networks
#     social: true
#   - title: |
#       Subscribe
#     subscribe: true
#     list:
#       - description: |
#           We are working hard to publish new reports and blog posts as soon as possible.

#           If you would like to get recent reports in your inbox, subscribe here!
---
