---
layout: post
title: On CSS sizes and performance budget
description: Read all about CSS sizes, performance budget, data usage and costs in Bundesliga sites.
image: /gfx/the-very-first-css-report-about-css-file-sizes-and-file-count.jpg
date: 2021-03-14
authors:
  - Ivan
  - Silvestar
blocks:
  - title: |
      On CSS sizes and performance budget
    details: true
  - title: |
      Comparison
    list:
      - description: |
          In our [first report](/reports/premier-league-2021-02/), we looked at CSS file size and file count in Premier League sites. We felt we couldn’t get all the answers by analyzing just one league, so we decided to create a report of another one—this time, we choose [Bundesliga](/reports/bundesliga-2021-03/).

          The results were not surprising. Both leagues have about the same amount of CSS code – an excessive amount.
  - title: |
      Performance Budget
    list:
      - description: |
          To see what an excessive amount of CSS code means for the end-user, let’s make a Bundesliga performance budget test. Performance budget usually includes HTML, JS, Images, Video, and Fonts, but since this site is dedicated to CSS, we will focus on CSS alone.

          Here's how [web.dev](https://web.dev/performance-budgets-101/) defines the performance budget:

          > A performance budget is a set of limits imposed on metrics that affect site performance. This could be the total size of a page, the time it takes to load on a mobile network, or even the number of HTTP requests that are sent. Defining a budget helps get the web performance conversation started. It serves as a point of reference for making decisions about design, technology, and adding features.

          Since we already analyzed the total CSS size and the number of CSS files, let's see how much time it usually takes to load the CSS code. We are going to use the average amount of external CSS code in Bundesliga sites, ~639KB, with a [Performance budget](https://www.performancebudget.io/) app to determine how much time it takes to load this amount of CSS data. The results are shown in the following table.


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



          According to [studies from Google](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/), 3-5 seconds is the critical period when bounce rate starts to increase drastically, and that is for the whole page with all assets.

          If we look at these results, we could see that it takes more than 6 seconds on slow 3G to load the average external CSS code in Bundesliga sites. Even DSL and fast 3G connections would take 3 seconds to load the CSS.

          If we take into account the compressed size of the external CSS size, ~103KB, we get the following results:


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


          Everything below slow 3G takes more than 3 seconds. [Backlinko's analysis](https://backlinko.com/page-speed-stats#load-time-and-compression-level) shows that not all compression is good, and it may not achieve optimal and desired results. Although that analysis is out of the scope of this article, it is worth noting that _“pages that compress 60%-80% of their files perform the worst”_.

          Making users wait because of CSS shouldn't be an option. Users leave sites [for various reasons](https://www.resourcetechniques.co.uk/news/seo/10-reasons-why-users-leave-your-website-in-10-seconds-101189). The number one reason is slow loading.
  - title: |
      Data Usage and Cost
    list:
      - description: |
          We thought it would be fun to use the collected data to discover how much the CSS code would cost in various countries.

          For reference, we are going to use data from [Cable.co.uk site](https://www.cable.co.uk/mobiles/worldwide-data-pricing/).

          Let’s focus on distinct regions of the world. Northern America has the most expensive data plans, with almost $15 per GB. Oceania, the Caribbean, Sub-Sarahan Africa, and South America follow with more than $5 per GB. Northern Africa, CIS (former USSR), and Asia (ex. near east) are the cheapest regions.

          Now let’s assume that we want to visit every Bundesliga site, including the site of Bundesliga itself. That is around ~12MB of uncopressed CSS code. For users in Nothern America, that will cost around 15 cents. For users in Nothern Africa, that will cost about 3 cents.

          Although these costs seem trivial, let’s use a different context here. 12MB is 1.17% of the 1GB, which means that you users will spend 1% of their data plan to download CSS alone for these sites. We don’t think that is trivial.

          If you are interested in how much a site costs you in some countries, you can check it out at  [whatdoesmysitecost.com](https://whatdoesmysitecost.com/).
  - title: |
      The Conclusion
    list:
      - description: |
          When thinking in kilobytes, it is easy to forget about costs and loading time. But every kilobytes counts. We should thrive to shave every single byte wherever possible. Since we are enthusiastic about CSS, we would be happy to see more developers take more care about CSS code itself.

          #RespectCSS
  - title: |
      Related resources
    list:
      - description: |
          - [The CSS File Size and Count Report for Bundesliga sites](/reports/bundesliga-2021-03/)
          - [The CSS File Size and Count Report for Premier League sites](/reports/premier-league-2021-02/)
          - [The Very First CSS Report About CSS File Sizes and File Count](/blog/the-very-first-css-report-about-css-file-sizes-and-file-count/)
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
