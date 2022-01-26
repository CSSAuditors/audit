---
layout: post
title: The CSS File Size and Count Report for Bundesliga sites
description: In this report, we are going to focus on the size of CSS. The aim of the report is to understand how much CSS code is needed to build a site.
image: /gfx/the-css-file-size-and-count-report-for-bundesliga-sites.jpg
date: 2021-03-17
tags:
  - report
metadata:
  authors:
    - Ivan
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

This report, like [the previous one](/reports/premier-league-2021-02/), will focus on the size of CSS. We are going to find out how much CSS is needed to create a site.

Sites audited in this report:

{% render report/general-site-list, report: reports.report2 %}

Note that we included the Bundesliga official site and all its clubs.

## The Tooling

Just like in the previous report, we used the following tools:

- [wappalyzer](https://github.com/aliasio/wappalyzer)
- [extract-css-core](https://github.com/bartveneman/extract-css-core)

Using these tools, we extracted information about UI frameworks and the size of External CSS, Style tag CSS, and Inline CSS, where:

- External CSS refers to CSS code that comes from external CSS files,
- Style Tag CSS refers to CSS code that comes from the `<style>` tags, and
- Inline CSS refers to CSS code that comes from the inline `style` attributes.

Since we stumbled upon some errors while extracting the CSS code from these sites, like repetitive CSS files or `<style>` tags, we removed it from the report. The data collected might slightly differ from the actual data, but it is still close enough to get the “big picture” about CSS sizes.

To make the text more readable, the terms “site” and “homepage” refer to the same thing: the site’s homepage.

<small>⚠️ Any errors in the report that might be caused by invalid software are not deliberate and should be considered as such.</small>

## The CSS File Sizes

{% render report/extractor-sizes-table, report: report2-extractor %}

### The Findings

An average page of the Bundesliga site loads ~712.69KB of CSS code. Compared to the Premier League report, that is 3.30% less CSS code. ~89.66% of the CSS code comes from the External CSS file, ~10% comes from the `<style>` tags, and ~0.34% comes from the inline `style` attributes. Compared to the Premier League report, an average Bundesliga site uses ~3.56% more External CSS, ~39.76% less CSS coming from the `<style>` tags, and ~3.54% less from inline `style` attributes.

{% render report/extractor-sizes-chart, report: report2-extractor %}

---

All Bundesliga sites use External CSS. Eintracht Frankfurt loads almost 1.5MB, Borussia Mönchengladbach, FC Bayern München and Schalke 04 use about ~ 1MB.

Every Bundesliga site uses the `<style>` tag. FC Bayern München loads the most CSS, 287KB. Following are Schalke 04 with 230.07KB, Hoffenheim with 229.08KB, and FC Köln with 229.01KB. Sites with the least `<style>` tag CSS code count only a few bytes, like Mainz 05 and Hertha.

As for the inline `style` attribute, everyone uses it too. Union Berlin uses the most with 9.84KB, Arminia Bielefeld and SV Werder Bremen use half of that, and Köln uses the least, only 422B.

#### Wappalyzer

According to Wappalyzer, four sites use UI frameworks. Borussia Dortmund uses Materialize CSS. Hoffenheim, Schalke 04, and Mainz 05 use Bootstrap.

{% render report/wappalyzer, report: report2-wappalyzer %}

According to research conducted by the [State Of CSS](https://2020.stateofcss.com/en-US/technologies/css-frameworks/), satisfaction with Bootstrap is declining. In 2019, 52% of respondents claimed they are satisfied, while the following year, the satisfaction dropped to 48%. Interest in Bootstrap in both years is held by 17% of all respondents. Usage fell from 87% to 86% within one year, and awareness ratio rankings for both years are 100%.

For Materialize CSS, satisfaction fell from 57% to 53%, just like the interest fell from 37% to 29%. The usage has increased from 30% to 33%, just like the awareness increased from 72% to 76%.

Bootstrap and Materialize CSS are the two most used frameworks, and Bundesliga sites follow the statistics here.

In comparison to four Bundesliga sites (out of 19 total) that use UI frameworks, only three Premier League sites (out of 21 total) use them.

## The CSS File Counts

{% render report/extractor-count-table, report: report2-extractor %}

### The Findings

The average Bundesliga site’s homepage loads 8 External CSS files, 5 `<style>` tags, and 30 `style` attributes.

{% render report/extractor-count-chart, report: report2-extractor %}

---

Augsburg loads only one, Bayer Leverkusen and Union Berlin load two, while the Bundesliga site loads 40 External CSS files.

All Bundesliga sites use `<style>` tags. Bayer Leverkusen, Borussia Mönchengladbach, Eintracht Frankfurt, Mainz 05 and Hertha use a single `<style>` tag. The Bundesliga site loads 39 `<style>` tags, and the second largest in the group is FC Bayern München with 16 `<style>` tags. Other clubs range from 2 to 8 `<style>` tags.

Every Bundesliga site uses inline `style` attributes, too. Köln, Stuttgart, and Wolfsburg use only a few `style` attributes, Arminia Bielefeld and SV Werder Bremen use about 60 `style` attributes, while Union Berlin uses as many as 154 `style` attributes.

## Top and Bottom Sites

Top three Bundesliga sites in terms of CSS file size are:

- Arminia Bielefeld,
- Union Berlin, and
- Köln.

On the other side, the bottom three sites in terms of CSS file size are:

- Eintracht Frankfurt,
- FC Bayern München, and
- FC Schalke 04.

## The Conclusion

Even though the average Bundesliga's homepage CSS size is slightly lighter than the average Premier League's homepage CSS size, it is still too big.

According to the [httparhive report](https://httparchive.org/reports/page-weight#bytesCss), the sum of transfer size kilobytes of all external stylesheets requested by the page for median desktop is 73.3KB, while the median mobile is 68.7KB. If we look at the last three years, CSS file size increased more than 30%.

The trend of loading more CSS code every year is continuing. With modern technologies like CSS Grid and CSS Variables that should take over CSS frameworks, one might expect a different outcome. We certainly hope that will be the case in the following years.

[#RespectCSS](https://twitter.com/search?q=%23RespectCSS&src=typed_query)

## Related resources

- Article: [On CSS sizes and performance budget](/blog/the-second-css-report-about-css-file-sizes-and-file-count/)
- Report: [The CSS File Size and Count Report for Premier League sites](/reports/premier-league-2021-02/)

## Complete Report

{% render report/extractor-list-table, report: report2-extractor %}
