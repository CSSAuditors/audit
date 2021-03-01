---
layout: post
title: The CSS File Size and Count Report for Bundesliga sites
description: In this report, we are going to focus on the size of CSS. The aim of the report is to understand how much CSS code is needed to build a site.
image: /gfx/the-css-file-size-and-count-report-for-premier-league-sites.jpg
object: sites3
date: 2021-02-17
author: Ivan
reports:
  - title: >-
      The CSS File Size and Count Report for Bundesliga sites
    details: true
  - list:
      - description: >-
          This report, like [the previous one](/reports/premier-league-2021-02/), focuses on the size of CSS. We share how much CSS is needed to create a site.

          Sites audited in this report:
      - var:
          item: $htmlSites
          type: extractor
      - description: >-
          Note that within the report, we included the Bundesliga official site, and all its clubs.
  - title: >-
      The Tooling
    list:
      - description: >-
          As for the previous report, we used the same tools:

          - [wappalyzer](https://github.com/aliasio/wappalyzer)

          - [extract-css-core](https://github.com/bartveneman/extract-css-core)

          Using these tools, we extracted information about UI frameworks and the size of External CSS, Style tag CSS, and Inline CSS, where:

          - External CSS refers to CSS code that comes from external CSS files,

          - Style Tag CSS refers to CSS code that comes from the `<style>` tags, and

          - Inline CSS refers to CSS code that comes from the inline `style` attributes.

          Since we stumbled upon some errors while extracting the CSS code from these sites, like repetitive CSS files or `<style>` tags, we removed it from the report. The data collected might slightly differ from the actual data, but it is still close enough to get the “big picture” about CSS sizes.

          To make the text more readable, the terms “site” and “homepage” refer to the same thing: the site’s homepage.

          ⚠️ Any errors in the report that might be caused by invalid software are not deliberate and should be considered as such.
  - title: >-
      The CSS File Sizes
    list:
      - var:
          item: $htmlReportSizes
          type: extractor
      - description: >-
          ### The Findings

          An average page of Bundesliga loads ~712.69KB CSS code. Compared to the Premier League report, it is 3.30% less CSS code. ~89.66% of the CSS code comes from the External CSS file, ~10% comes from the `<style>` tags, and ~0.34% comes from the inline `style` attribute. Compared to the Premier League report, we could see that the average Bundesliga site uses ~3.56% more External CSS, ~39.76% less CSS coming from the `<style>` tag and ~3.54% less inline `style` CSS.

          #### Performance budget

          According to [web.dev](https://web.dev/performance-budgets-101/) we find the definition of performance budget:

          > A performance budget is a set of limits imposed on metrics that affect site performance. This could be the total size of a page, the time it takes to load on a mobile network, or even the number of HTTP requests that are sent. Defining a budget helps get the web performance conversation started. It serves as a point of reference for making decisions about design, technology, and adding features.

          The optimal conditions for the overall load time are up to 3 seconds. Although all website items such as HTML, JS, Images, Video and Fonts are viewed for overall load, we will only focus on CSS’s load speed.

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

      - chart:
          item: ReportSizeCombined
          type: extractor
          info: This graph is interactive. You could hover or tap regions to see extra information and enable or disable specific metric by clicking on a label below the graph.
      - description: >-
          All Bundesliga sites use External CSS. Eintracht Frankfurt loads almost 1.5MB, Borussia Mönchengladbach, FC Bayern München and Schalke 04 use about ~ 1MB.

          Every Bundesliga site uses the `<style>` tag. FC Bayern München loads most with 287KB, followed by Schalke 04 with 230.07KB, than Hoffenheim with 229.08KB, and FC Köln with 229.01KB. Most contain size only in Bytes.

          As for the inline `style` attribute, everyone uses it too. Union Berlin uses the most with 9.84KB, Arminia Bielefeld and SV Werder Bremen use half of that, and Köln uses the least, only 422B.
      - description: >-
          #### Wappalyzer

          According to Wappalyzer, six sites use UI frameworks. Borussia Dortmund uses Materialize CSS, Hoffenheim, Freiburg, Hertha, Schalke 04, and Mainz 05 use Bootstrap.
      - var:
          item: $htmlWappalyzer
          type: wappalyzer
      - description: >-
          According to research conducted by [State Of CSS](https://2020.stateofcss.com/en-US/technologies/css-frameworks/), we can see that satisfaction on Bootstrap is declining, and that in 2019 52% of respondents are satisfied, while next year in 2020 it dropped to 48%. Interest in Bootstrap in both years is held by 17% of all respondents. Usage fell from 87% to 86% within one year, and awareness ratio rankings for both years is 100%.
          For Materialize CSS satisfaction fell from 57% to 53%. His interest also fell from 37% to 29%. His usage has increased from 30% to 33% and more and more developers are aware of the existence of the framework and we see an increase of 72% to 76% in awareness.

          From this we can see that the presence of the CSS Framework on Bundesliga sites is big and amounts to about ~ 31.58%.
  - title: >-
      The CSS File Counts
    object: sizes
    list:
      - var:
          item: $htmlReportCount
          type: extractor
      - description: >-
          ### The Findings

          The average Bundesliga site’s homepage loads 8 External CSS files, 5 `<style>` tags, and 30 `style` attributes.

      - chart:
          item: ReportCountCombined
          type: extractor
          info: This graph is interactive. You could hover or tap regions to see extra information and enable or disable specific metric by clicking on a label below the graph.
      - description: >-
          Augsburg loads only one, Bayer Leverkusen and Union Berlin load two, while the Bundesliga site loads 40 External CSS files.

          All Bundesliga sites use `<style>` tags. Bayer Leverkusen, Borussia Mönchengladbach, Eintracht Frankfurt, Mainz 05 and Hertha use a single `<style>` tag. The Bundesliga site loads 39 `<style>` tag, the second largest in the group is FC Bayern München with 16 `<style>` tags, . Other clubs range from 2 to 8 `<style>` tag.

          Also all Bundesliga sites use inline `style` attributes. Köln, Stuttgart and Wolfsburg use only a few `style` attributes, Arminia Bielefeld and SV Werder Bremen use about 60 `style` attributes, while Union Berlin uses as many as 154 `style` attributes.
  - title: >-
      Top and Bottom Sites
    list:
      - description: >-
          Top three Bundesliga sites in terms of CSS file size are:

          - Arminia Bielefeld,

          - Union Berlin, and

          - Köln.

          On the other side, the bottom three sites in terms of CSS file size are:

          - Eintracht Frankfurt,

          - FC Bayern München, and

          - FC Schalke 04.
  - title: >-
      The Conclusion and new questions
    list:
      - description: >-
          The average homepage of the Bundesliga site is overcrowded with CSS. Compared to [the Premier League](/reports/premier-league-2021-02/) we see a slight decrease, but it is still much more than the average website.

          According to the [httparhive](https://httparchive.org/reports/page-weight#bytesCss) report we see that the sum of transfer size kilobytes of all external stylesheets requested by the page for median desktop is 73.3KB, while for median mobile it is 68.7KB. If we look at the last 3 years, there is an increase of more than 30% in the size of the CSS file.

          We cannot know what are the reasons for the increase, but with modern technologies like CSS Grid and CSS Variables that should take over CSS frameworks, one might expect the different outcome. We hope to see more optimized CSS code in the future.

          #RespectCSS
  - title: >-
      About the Author
    author: true
  - title: >-
      Share on Social Networks
    social: true
  - title: >-
      Subscribe
    subscribe: true
    list:
      - description: >-
          We are working hard to publish new reports and blog posts as soon as possible.

          If you would like to get recent reports in your inbox, subscribe here!
  - title: >-
      Single Reports
    list:
      - var:
          item: $htmlReportSingle
          type: extractor
---
