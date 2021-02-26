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

          An average page of Bundesliga loads ~679KB CSS code. Compared to the Premier League report, it is 4.09% less CSS code. ~90.9% of the CSS code comes from the External CSS file, ~8.73% comes from the `<style>` tags, and ~0.36% comes from the inline `style` attribute. Compared to the Premier League report, we could see that the average Bundesliga site uses ~6.48% more External CSS, ~7.31% less CSS coming from the `<style>` tag and ~0.02% more inline `style` CSS.

          #### Performance budget

          Blog or rewrite

          According to Performance budget ... (https://www.performancebudget.io/)

          The optimal conditions for the overall load time are up to 3 seconds. Although all website items such as HTML, JS, Images, Video and Fonts are viewed for overall load, we will only focus on CSS’s load speed.

          If we take the average size of the External CSS site of the Bundesliga, which is 617.66KB, we get the following load speeds:


          | Connection Type             | Time (secs) |
          | --------------------------- | ----------- |
          | Mobile 2G - Slow (35 Kbps)  | 155.20 secs |
          | 56K Dial-Up (49Kbps)        | 97.00 secs  |
          | Mobile 2G - Fast (150 Kbps) | 36.21 secs  |
          | Mobile Edge (240 Kbps)      | 22.63 secs  |
          | Mobile 3G - Slow (780 Kbps) | 7.07 secs   |
          | DSL (1.5Mbps)               | 3.62 secs   |
          | Mobile 3G - Fast (1.6 Mbps) | 3.40 secs   |
          | Cable (5Mbps)               | 1.09 secs   |
          | FIOS (20Mbps)               | 0.27 secs   |


          Note: For testing, we set a maximum optimal time of 3 secs.

          To reduce the CSS read speed, it is compressed. The average size of a Gzip CSS Bundesliga site is ~100.26KB. If we take this value, we get the following results:


          | Connection Type             | Time (secs) |
          | --------------------------- | ----------- |
          | Mobile 2G - Slow (35 Kbps)  | 23.09 secs  |
          | 56K Dial-Up (49Kbps)        | 14.43 secs  |
          | Mobile 2G - Fast (150 Kbps) | 5.39 secs   |
          | Mobile Edge (240 Kbps)      | 3.37 secs   |
          | Mobile 3G - Slow (780 Kbps) | 1.05 secs   |
          | DSL (1.5Mbps)               | 0.54 secs   |
          | Mobile 3G - Fast (1.6 Mbps) | 0.51 secs   |
          | Cable (5Mbps)               | 0.16 secs   |
          | FIOS (20Mbps)               | 0.04 secs   |

          Note: For testing, we set a maximum optimal time of 3 secs.

      - chart:
          item: ReportSizeCombined
          type: extractor
          info: This graph is interactive. You could hover or tap regions to see extra information and enable or disable specific metric by clicking on a label below the graph.
      - description: >-
          All Bundesliga sites use External CSS. Eintracht Frankfurt loads almost 1.5MB, Borussia Mönchengladbach and Schalke 04 use about ~ 1MB.

          Every Bundesliga site uses the `<style>` tag. Schalke 04 loads most with 230.07KB, followed by Hoffenheim with 229.08KB. Most contain size only in Bytes.

          As for the inline `style` attribute, everyone uses it too. Union Berlin uses the most with 9.84KB, Arminia Bielefeld and SV Werder Bremen use half of that, and Köln uses the least, only 422B.
      - description: >-
          #### Wappalyzer

          According to Wappalyzer, six sites use UI frameworks. Borussia Dortmund uses Materialize CSS, Hoffenheim, Freiburg, Hertha, Schalke 04, and Mainz 05 use Bootstrap.
      - var:
          item: $htmlWappalyzer
          type: wappalyzer
      - description: >-
          Blog or rewrite

          According to research conducted by [State Of CSS](https://2020.stateofcss.com/en-US/technologies/css-frameworks/), we can see that satisfaction, interest, usage, and awareness ratio rankings for Bootstrap are declining, while for Materialize CSS is rising.
  - title: >-
      The CSS File Counts
    object: sizes
    list:
      - var:
          item: $htmlReportCount
          type: extractor
      - description: >-
          ### The Findings

          The average Bundesliga site’s homepage loads 8 External CSS files, 4 `<style>` tags, and 30 `style` attributes.

      - chart:
          item: ReportCountCombined
          type: extractor
          info: This graph is interactive. You could hover or tap regions to see extra information and enable or disable specific metric by clicking on a label below the graph.
      - description: >-
          Augsburg loads only one, Bayer Leverkusen and Union Berlin load two, while the Bundesliga site loads 40 External CSS files.

          All Bundesliga sites use `<style>` tags. Bayer Leverkusen, Borussia Mönchengladbach, Eintracht Frankfurt, Mainz 05 and Hertha use a single `<style>` tag. The Bundesliga site loads 39 `<style>` tag. Other clubs range from 2 to 8 `<style>` tag.

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

          - FC Schalke, and

          - Borussia Mönchengladbach.
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
