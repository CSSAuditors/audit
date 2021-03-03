---
layout: post
title: The Second CSS Report About CSS File Size and File Count
description: Learn how and why we started this site and how we published our first report about file sizes in Premier League sites.
image: /gfx/the-very-first-css-report-about-css-file-sizes-and-file-count.jpg
date: 2021-02-18
author: Ivan
reports:
  - title: |
      The Second CSS Report About CSS File Size and File Count
    details: true
  - title: |
      The Very Beginning
    list:
      - description: |
          !#!#!#!# OG IMAGE

          Last year, when Silvestar suggested me an idea for a project, I was thrilled. Since we share the same passion and love for CSS, I wanted to see where this would take us and what I would learn along the way.
  - title: |
      Comparison
    list:
      - description: |
          In the [first report](https://css-auditors.com/reports/premier-league-2021-02/), we looked at CSS file size and file count of the Premier League. We feel we can’t get all the answers by analyzing just one league, so we decided to make a comparison with another. For comparison, I opted for the Bundesliga even though I could use any other football league.

          I find the results quite astonishing. Both leagues have about the same amount of CSS and both use it in excessive amounts. Although some clubs meet the rules of good practice of using CSS, we looked at the league in general.

  - title: |
      Performance Budget
    list:
      - description: |
          To see what an excessive amount of CSS file means for the end user, I decided to do a performance test of Bundesliga. I would emphasize that for a realistic performance budget all website items should be included such as HTML, JS, Images, Video and Fonts. We are based exclusively on CSS.

          According to [web.dev](https://web.dev/performance-budgets-101/) performance budget definition is:

          > A performance budget is a set of limits imposed on metrics that affect site performance. This could be the total size of a page, the time it takes to load on a mobile network, or even the number of HTTP requests that are sent. Defining a budget helps get the web performance conversation started. It serves as a point of reference for making decisions about design, technology, and adding features.

          The optimal conditions for the overall load time are up to 3 seconds. Although all website items are viewed for overall load, I repeat, we will only focus on CSS’s load speed.

          If we take the average size of the External CSS site of the Bundesliga, which is 639KB, we get the following load speeds according to [Performance budget](https://www.performancebudget.io/):


          | Connection Type             | Time (secs) |
          | --------------------------- | ----------- |
          | Mobile 2G - Slow (35 Kbps)  | 146.06 secs |
          | 56K Dial-Up (49Kbps)        | 91.29 secs  |
          | Mobile 2G - Fast (150 Kbps) | 34.08 secs  |
          | Mobile Edge (240 Kbps)      | 21.30 secs  |
          | Mobile 3G - Slow (780 Kbps) | 6.66 secs   |
          | DSL (1.5Mbps)               | 3.41 secs   |
          | Mobile 3G - Fast (1.6 Mbps) | 3.19 secs   |
          | Cable (5Mbps)               | 1.02 secs   |
          | FIOS (20Mbps)               | 0.26 secs   |


          Note: For testing, we set a maximum optimal time of 3 secs.
      - description: |
          We can see that CSS loads in optimal conditions only when using Cable (5Mbps) and FIOS (20Mbps) network. The performance budget tool does not show Mobile 4G speed, but I could conclude that it will also meet the speed requirements.
      - description: |
          To reduce the CSS read speed, it is compressed. The average size of a Gzip CSS Bundesliga site is ~103.14KB. If we take this value, we get the following results:


          | Connection Type             | Time (secs) |
          | --------------------------- | ----------- |
          | Mobile 2G - Slow (35 Kbps)  | 23.54 secs  |
          | 56K Dial-Up (49Kbps)        | 14.71 secs  |
          | Mobile 2G - Fast (150 Kbps) | 5.49 secs   |
          | Mobile Edge (240 Kbps)      | 3.43 secs   |
          | Mobile 3G - Slow (780 Kbps) | 1.07 secs   |
          | DSL (1.5Mbps)               | 0.55 secs   |
          | Mobile 3G - Fast (1.6 Mbps) | 0.52 secs   |
          | Cable (5Mbps)               | 0.16 secs   |
          | FIOS (20Mbps)               | 0.04 secs   |

          Note: For testing, we set a maximum optimal time of 3 secs.

      - description: |
          Here we can see that anything faster than the Slow (780Kbs) Mobile 3G network meets the CSS reading criteria.
          According to [Backlinko analysis](https://backlinko.com/page-speed-stats#load-time-and-compression-level), we can see that compression will not always achieve optimal and desired results.

          !#!#!# 1s is too much. Do you want to make your user wait for a second until CSS loads? Users leave sites all the time. There's a statistics about users leaving site after a few seconds, use it here.

          !#!#!# Also find stats about data plans. What is the average MB a person use in UK or in Africa? What percentage is if they visit all sites, for example. Think of a real use case here. A fun one.

  - title: |
      Final Thoughts
    list:
      - description: |
          We can see that CSS compression saved the load time of CSS itself, but that still doesn’t give us an answer to the question of why it is necessary to use excessive CSS for a Bundesliga or Premier League site. How much of that CSS is actually used? Has this huge CSS been created over the years?
          We will try to answer these questions in the following reports.

          We hope we've encouraged you to think about the size of your CSS code.

          #RespectCSS
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
