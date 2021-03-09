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

          As for the user experience, there is a lot of research that says that users leave the website if it does not load in [3 seconds](https://www.hostingmanual.net/3-seconds-how-website-speed-impacts-visitors-sales/). So we will consider those 3 seconds as the maximum optimal value. It has been proven that 57% of users will leave the page after 3 seconds. Although all website items are viewed for overall load, I repeat, we will only focus on CSS’s load speed.

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
          We can see that CSS loads in optimal conditions only when using Cable (5Mbps) and FIOS (20Mbps) network. The performance budget tool does not show Mobile 4G speed, and newly introduced 5G network, but I could conclude that it will also meet the speed requirements. If we compare with the Premier League average size of 616.28KB, we can expect a slight and negligible decrease.
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

          We think 1 second is a lot just to load CSS. Do you want to make your user wait for a second until CSS loads? Users leave sites all the time. The main reasons why users leave sites [are](https://www.resourcetechniques.co.uk/news/seo/10-reasons-why-users-leave-your-website-in-10-seconds-101189).
          In Google, Maile Ohye, states that:
          > 2 seconds is the threshold for ecommerce website acceptability. At Google, we aim for under a half-second.
          Half a second is fast, to put it in layman terms it’s close to blinking, while two seconds is shorter than one breath. This is what we must strive for when loading our sites.
  - title: |
      Data Usage and Cost
    list:
      - description: |
          The average person used about 2.9GB of mobile data per month until early 2019. This was an increase of 34% compared to 2018. By the end of 2019, usage had increased by 22% and amounted to 3.6GB. This is data from [OFCOM’s Communication Market Report](https://www.ofcom.org.uk/__data/assets/pdf_file/0026/203759/cmr-2020.pdf) and does not include amounts for 2020. That won’t have been a representative year anyway given the coronavirus pandemic. But with the introduction of 5G, and the ever-increasing data demands of modern applications, we’d expect data use will be continuing to grow rapidly.

          The average price of 1GB in the UK is $1.39, while in Germany it is $4.06 according to data from [cable.co.uk](https://www.cable.co.uk/mobiles/worldwide-data-pricing/).
          According to these prices, in the UK if a user opens all Bundesliga sites, it will cost him $0.017 just to show him the CSS of those sites. For the Premier League it will be $0.018. The Germans will pay more, and will pay $0.05 for the CSS load of all Bundesliga sites, while it is $0.051 for the Premier League sites.

          If you are interested in how much a site costs you in some countries, you can check it out at [whatdoesmysitecost.com](https://whatdoesmysitecost.com/).

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
