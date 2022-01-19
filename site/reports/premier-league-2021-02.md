---
layout: post
title: The CSS File Size and Count Report for Premier League sites
description: In this report, we are going to focus on the size of CSS. The aim of the report is to understand how much CSS code is needed to build a site.
image: /gfx/the-css-file-size-and-count-report-for-premier-league-sites.jpg
date: 2021-02-17
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

In this report, we are going to focus on the size of CSS. The aim of the report is to understand how much CSS code is needed to build a site.

Sites audited in this report:

{% if reports.report1 %}
<ul>
  {% for item in reports.report1.list %}
  <li><a href="{{ item.url }}" target="_blank">{{ item.title }}</a></li>
  {% endfor %}
</ul>
{% endif %}

Note that we included all sites of the Premier League plus the Premier League official site.

## The Tooling

To generate this report, we used the following tools:

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

{% if report1-extractor %}
<div class="table-wrapper">
<table class="small">
  <tbody>
  <tr>
    <th></th>
    <th>Site</th>
    <th class="tar">Size</th>
    <th class="tar">Gzip</th>
  </tr>
  <tr>
    <td><b>Site with the largest {{ "link-or-import" | extractorName }}</b></td>
    <td>{{ report1-extractor.maxSizeImport.site.title }}</td>
    <td class="tar">{{ report1-extractor.maxSizeImport['link-or-import'].size | fileSize }}</td>
    <td class="tar">{{ report1-extractor.maxSizeImport['link-or-import'].gzip | fileSize }}</td>
  </tr>
  <tr>
  {% assign minSizeImports = report1-extractor.minSizeImports | size %}
  {% if minSizeImports > 0 %}
  {% assign minSize = report1-extractor.minSizeImports | size %}
  {% for minItem in report1-extractor.minSizeImports %}
  <td><b>{% if minSize > 1 %}Sites{% else %}Site{% endif %} with no {{ "link-or-import" | extractorName }}</b></td>
  <td>{{ minItem.site.title }}</td>
  <td class="tar">-</td>
  <td class="tar">-</td>
  {% endfor %}
  {% else %}
  <td><b>Site with the smallest {{ "link-or-import" | extractorName }}</b></td>
  <td>{{ report1-extractor.minSizeImport.site.title }}</td>
  <td class="tar">{{ report1-extractor.minSizeImport['link-or-import'].size | fileSize }}</td>
  <td class="tar">{{ report1-extractor.minSizeImport['link-or-import'].gzip | fileSize }}</td>
  {% endif %}
  </tr>
  <tr>
    <td><b>Average size of {{ "link-or-import" | extractorName }}</b></td>
    <td>-</td>
    <td class="tar">{{ report1-extractor.avgSizeImport.size | fileSize }}</td>
    <td class="tar">{{ report1-extractor.avgSizeImport.gzip | fileSize }}</td>
  </tr>
  <tr>
    <td><b>Site with the largest {{ "style" | extractorName }}</b></td>
    <td>{{ report1-extractor.maxSizeStyle.site.title }}</td>
    <td class="tar">{{ report1-extractor.maxSizeStyle['style'].size | fileSize }}</td>
    <td class="tar">{{ report1-extractor.maxSizeStyle['style'].gzip | fileSize }}</td>
  </tr>
  <tr>
  {% assign minSizeStyles = report1-extractor.minSizeStyles | size %}
  {% if minSizeStyles > 0 %}
  {% assign minSize = report1-extractor.minSizeStyles | size %}
  {% for minItem in report1-extractor.minSizeStyles %}
  <td><b>{% if minSize > 1 %}Sites{% else %}Site{% endif %} with no {{ "style" | extractorName }}</b></td>
  <td>{{ minItem.site.title }}</td>
  <td class="tar">-</td>
  <td class="tar">-</td>
  {% endfor %}
  {% else %}
  <td><b>Site with the smallest {{ "style" | extractorName }}</b></td>
  <td>{{ report1-extractor.minSizeStyle.site.title }}</td>
  <td class="tar">{{ report1-extractor.minSizeStyle['style'].size | fileSize }}</td>
  <td class="tar">{{ report1-extractor.minSizeStyle['style'].gzip | fileSize }}</td>
  {% endif %}
  </tr>
  <tr>
    <td><b>Average size of {{ "style" | extractorName }}</b></td>
    <td>-</td>
    <td class="tar">{{ report1-extractor.avgSizeStyle.size | fileSize }}</td>
    <td class="tar">{{ report1-extractor.avgSizeStyle.gzip | fileSize }}</td>
  </tr>
  <tr>
    <td><b>Site with the largest {{ "inline" | extractorName }}</b></td>
    <td>{{ report1-extractor.maxSizeInline.site.title }}</td>
    <td class="tar">{{ report1-extractor.maxSizeInline['inline'].size | fileSize }}</td>
    <td class="tar">{{ report1-extractor.maxSizeInline['inline'].gzip | fileSize }}</td>
  </tr>
  <tr>
  {% assign minSizeInlines = report1-extractor.minSizeInlines | size %}
  {% if minSizeInlines > 0 %}
    {% assign minSize = report1-extractor.minSizeInlines | size %}
    {% for minItem in report1-extractor.minSizeInlines %}
    <td><b>{% if minSize > 1 %}Sites{% else %}Site{% endif %} with no {{ "inline" | extractorName }}</b></td>
    <td>{{ minItem.site.title }}</td>
    <td class="tar">-</td>
    <td class="tar">-</td>
    {% endfor %}
  {% else %}
  <td><b>Site with the smallest {{ "inline" | extractorName }}</b></td>
  <td>{{ report1-extractor.minSizeInline.site.title }}</td>
  <td class="tar">{{ report1-extractor.minSizeInline['inline'].size | fileSize }}</td>
  <td class="tar">{{ report1-extractor.minSizeInline['inline'].gzip | fileSize }}</td>
  {% endif %}
  </tr>
  <tr>
    <td><b>Average size of {{ "inline" | extractorName }}</b></td>
    <td>-</td>
    <td class="tar">{{ report1-extractor.avgSizeInline.size | fileSize }}</td>
    <td class="tar">{{ report1-extractor.avgSizeInline.gzip | fileSize }}</td>
  </tr>
  </tbody>
</table>
</div>
{% endif %}

### The Findings

An average homepage of the Premier League site loads ~737KB of CSS code. Around ~83.61% of the CSS code comes from external CSS files, around ~16,04% comes from the `<style>` tags, and only ~0.34% comes from the inline `style` attributes. It is not surprising that most of the CSS code comes from the external CSS files since that is the most recommended way to do it. With the recent Google updates about Web Vitals, like Cumulative Layout Shifts and Largest Contentful Paint, and the awareness of the importance of the “above the fold” code, it is also not surprising to see the percentage of the Style Tag CSS. The least popular, as it should be, is the Inline CSS code.

#### Web Almanac

According to [Web Almanac](https://almanac.httparchive.org/en/2020/css#usage), around 10% of all processed sites load more than 240KB of CSS code. According to this report, all Premier League sites but two, Burnley’s and Wolverhampton’s, load more than 240KB of CSS code overall.

> While JavaScript far surpasses CSS in its share of page weight, CSS has certainly grown in size over the years, with the median desktop page loading 62 KB of CSS code, and one in ten pages loading more than 240 KB of CSS code.

{% if report1-extractor %}
<div class="table-wrapper">
<table class="small charts-css bar multiple show-heading show-labels show-primary-axis show-data-axes data-spacing-3" style="--labels-size: 11em;--cols: {{ report1-extractor.list | size }}">
  <caption>CSS sizes</caption>
  <thead>
    <tr>
      <th scope="col">Site</th>
      <th scope="col">Size</th>
    </tr>
  </thead>
  <tbody>
  {% for item in report1-extractor.list %}
  {% assign maxImportSize = report1-extractor.maxSizeImport['link-or-import'].size %}
  {% if item['link-or-import'].size %}
    {% assign importSize = item['link-or-import'].size %}
    {% assign importSizePercent = importSize | divided_by: maxImportSize %}
  {% else %}
    {% assign importSize = 0 %}
    {% assign importSizePercent = 0 %}
  {% endif %}
  {% assign maxStyleSize = report1-extractor.maxSizeStyle['style'].size %}
  {% if item['style'].size %}
    {% assign styleSize = item['style'].size %}
    {% assign styleSizePercent = styleSize | divided_by: maxStyleSize %}
  {% else %}
    {% assign styleSize = 0 %}
    {% assign styleSizePercent = 0 %}
  {% endif %}
  {% assign maxInlineSize = report1-extractor.maxSizeInline['inline'].size %}
  {% if item['inline'].size %}
    {% assign inlineSize = item['inline'].size %}
    {% assign inlineSizePercent = inlineSize | divided_by: maxInlineSize %}
  {% else %}
    {% assign inlineSize = 0 %}
    {% assign inlineSizePercent = 0 %}
  {% endif %}
  <tr>
  <th scope="row">{{ item.site.title }}</th>
  <td style="--size:{{ importSizePercent }};"><span>{{ item['link-or-import'].name }}: {{ importSize | fileSize }}</span></td>
  <th scope="row">{{ item.site.title }}</th>
  <td style="--size:{{ styleSizePercent }};"><span>{{ item['style'].name }}: {{ styleSize | fileSize }}</span></td>
  <th scope="row">{{ item.site.title }}</th>
  <td style="--size:{{ inlineSizePercent }};"><span>{{ item['inline'].name }}: {{ inlineSize | fileSize }}</span></td>
  </tr>
  {% endfor %}
  </tbody>
</table>
<ul class="charts-css legend legend-inline legend-circle">
  <li style="--color-1: hsl(222, 88%, 55%);"><small>{{ report1-extractor.maxSizeInline['link-or-import'].name }}</small></li>
  <li style="--color-2: hsl(252, 88%, 55%);"><small>{{ report1-extractor.maxSizeInline['style'].name }}</small></li>
  <li style="--color-3: hsl(192, 88%, 55%);"><small>{{ report1-extractor.maxSizeInline['inline'].name }}</small></li>
</ul>
</div>
{% endif %}

<small>_This graph is interactive. You could tap or hover over bars to see extra information._</small>

Burnley’s and Chelsea’s sites do not load any external CSS file. The Premier League’s site loads more than 2MB of External CSS. Four other sites load more than 1MB of External CSS.

Everton’s, Leicester’s, and Newcastle’s sites don’t use the `<style>` tag. Chelsea’s site loads more than 900KB, and three other sites load more than 200KB.

Regarding the inline `style` attribute, all sites load less than 8KB of CSS code. Six sites load less than 1KB, and the lowest CSS code that comes from the inline `style` attribute is loaded on Everton’s site. Three sites load more than 6KB, where Aston Villa’s site loads the most, more than 7KB.

#### Wappalyzer

According to Wappalyzer, a tool for identifying technologies on websites, only three sites use UI frameworks: Leeds’s and West Ham’s sites use Bootstrap and WBA’s site uses the ZURB Foundation framework.

{% if report1-wappalyzer %}
<div class="table-wrapper">
<table class="small">
  <tbody>
  <tr>
    <th><b>Site</b></th>
    <th><b>UI framework</b></th>
  </tr>
  {% for item in report1-wappalyzer %}
  <tr>
    <td>{{ item.site.title }}</td>
    <td>{{ item.frameworks }}</td>
  </tr>
  {% endfor %}
  </tbody>
</table>
</div>
{% endif %}

Let us compare the average size of the Premier League site to UI frameworks sizes. The full version of Materialize CSS is around ~142KB, Bootstrap is around ~160KB, Foundation is around 168KB, and Tachyons is around ~205KB. Premier League sites load CSS code that is more than five times bigger than the entire Materialize CSS, more than 4.5 times bigger than Bootstrap, almost 4.5 times bigger than Foundation, and more than 3.5 times bigger than Tachyons.

## The CSS File Counts


{% if report1-extractor %}
<div class="table-wrapper">
<table class="small">
  <tbody>
  <tr>
    <th></th>
    <th>Site</th>
    <th class="tar">Count</th>
  </tr>
  <tr>
    <td><b>Site with the largest number of  {{ "link-or-import" | extractorName }}</b></td>
    <td>{{ report1-extractor.maxCountImport.site.title }}</td>
    <td class="tar">{{ report1-extractor.maxCountImport['link-or-import'].count }}</td>
  </tr>
  <tr>
  {% assign minCountImports = report1-extractor.minCountImports | size %}
  {% if minCountImports > 0 %}
  {% assign minCount = report1-extractor.minCountImports | size %}
  {% for minItem in report1-extractor.minCountImports %}
  <td><b>{% if minCount > 1 %}Sites{% else %}Site{% endif %} with no {{ "link-or-import" | extractorName }}</b></td>
  <td>{{ minItem.site.title }}</td>
  <td class="tar">0</td>
  {% endfor %}
  {% else %}
  <td><b>Site with the smallest {{ "link-or-import" | extractorName }}</b></td>
  <td>{{ report1-extractor.minCountImport.site.title }}</td>
  <td class="tar">{{ report1-extractor.minCountImport['link-or-import'].count }}</td>
  {% endif %}
  </tr>
  <tr>
    <td><b>Average size of {{ "link-or-import" | extractorName }}</b></td>
    <td>-</td>
    <td class="tar">{{ report1-extractor.avgCountImport | floor }}</td>
  </tr>
  <tr>
    <td><b>Site with the largest {{ "style" | extractorName }}</b></td>
    <td>{{ report1-extractor.maxCountStyle.site.title }}</td>
    <td class="tar">{{ report1-extractor.maxCountStyle['style'].count }}</td>
  </tr>
  <tr>
  {% assign minCountStyles = report1-extractor.minCountStyles | size %}
  {% if minCountStyles > 0 %}
  {% assign minCount = report1-extractor.minCountStyles | size %}
  {% for minItem in report1-extractor.minCountStyles %}
  <td><b>{% if minCount > 1 %}Sites{% else %}Site{% endif %} with no {{ "style" | extractorName }}</b></td>
  <td>{{ minItem.site.title }}</td>
  <td class="tar">0</td>
  {% endfor %}
  {% else %}
  <td><b>Site with the smallest {{ "style" | extractorName }}</b></td>
  <td>{{ report1-extractor.minCountStyle.site.title }}</td>
  <td class="tar">{{ report1-extractor.minCountStyle['style'].count }}</td>
  {% endif %}
  </tr>
  <tr>
    <td><b>Average size of {{ "style" | extractorName }}</b></td>
    <td>-</td>
    <td class="tar">{{ report1-extractor.avgCountStyle | floor }}</td>
  </tr>
  <tr>
    <td><b>Site with the largest {{ "inline" | extractorName }}</b></td>
    <td>{{ report1-extractor.maxCountInline.site.title }}</td>
    <td class="tar">{{ report1-extractor.maxCountInline['inline'].count }}</td>
  </tr>
  <tr>
  {% assign minCountInlines = report1-extractor.minCountInlines | size %}
  {% if minCountInlines > 0 %}
  {% assign minCount = report1-extractor.minCountInlines | size %}
  {% for minItem in report1-extractor.minCountInlines %}
  <td><b>{% if minCount > 1 %}Sites{% else %}Site{% endif %} with no {{ "inline" | extractorName }}</b></td>
  <td>{{ minItem.site.title }}</td>
  <td class="tar">0</td>
  {% endfor %}
  {% else %}
  <td><b>Site with the smallest {{ "inline" | extractorName }}</b></td>
  <td>{{ report1-extractor.minCountInline.site.title }}</td>
  <td class="tar">{{ report1-extractor.minCountInline['inline'].count }}</td>
  {% endif %}
  </tr>
  <tr>
    <td><b>Average size of {{ "inline" | extractorName }}</b></td>
    <td>-</td>
    <td class="tar">{{ report1-extractor.avgCountInline | floor }}</td>
  </tr>
  </tbody>
</table>
</div>
{% endif %}

### The Findings

The Premier League site’s average homepage loads 4 External CSS files, 19 `<style>` tags, and 23 `style` attributes.

#### Web Almanac

According to Web Almanac, 7% of all pages use a single External CSS file, while the average is 6.

> All these kilobytes of code are typically distributed across multiple files and `<style>` elements; only about 7% of pages concentrate all their CSS code in one remote stylesheet, as we are often taught to do. In fact, the median page contains 3 `<style>` elements and 6 remote stylesheets, with 10% of them carrying over 14 `<style>` elements and over 20 remote CSS files! While this is suboptimal on desktop, it really kills performance on mobile, where round-trip latency is more important than raw download speed.

{% if report1-extractor %}
<div class="table-wrapper">
<table class="small charts-css bar multiple show-heading show-labels show-primary-axis show-data-axes data-spacing-3" style="--labels-size: 11em;--cols: {{ report1-extractor.list | size }}">
  <caption>CSS count</caption>
  <thead>
    <tr>
      <th scope="col">Site</th>
      <th scope="col">Count</th>
    </tr>
  </thead>
  <tbody>
  {% for item in report1-extractor.list %}
  {% assign maxImportCount = report1-extractor.maxCountImport['link-or-import'].count %}
  {% if item['link-or-import'].count %}
    {% assign importCount = item['link-or-import'].count %}
    {% assign importCountPercent = importCount | divided_by: maxImportCount %}
  {% else %}
    {% assign importCount = 0 %}
    {% assign importCountPercent = 0 %}
  {% endif %}
  {% assign maxStyleCount = report1-extractor.maxCountStyle['style'].count %}
  {% if item['style'].count %}
    {% assign styleCount = item['style'].count %}
    {% assign styleCountPercent = styleCount | divided_by: maxStyleCount %}
  {% else %}
    {% assign styleCount = 0 %}
    {% assign styleCountPercent = 0 %}
  {% endif %}
  {% assign maxInlineCount = report1-extractor.maxCountInline['inline'].count %}
  {% if item['inline'].count %}
    {% assign inlineCount = item['inline'].count %}
    {% assign inlineCountPercent = inlineCount | divided_by: maxInlineCount %}
  {% else %}
    {% assign inlineCount = 0 %}
    {% assign inlineCountPercent = 0 %}
  {% endif %}
  <tr>
  <th scope="row">{{ item.site.title }}</th>
  <td style="--size:{{ importCountPercent }};"><span>{{ item['link-or-import'].name }}: {{ importCount }}</span></td>
  <th scope="row">{{ item.site.title }}</th>
  <td style="--size:{{ styleCountPercent }};"><span>{{ item['style'].name }}: {{ styleCount }}</span></td>
  <th scope="row">{{ item.site.title }}</th>
  <td style="--size:{{ inlineCountPercent }};"><span>{{ item['inline'].name }}: {{ inlineCount }}</span></td>
  </tr>
  {% endfor %}
  </tbody>
</table>
<ul class="charts-css legend legend-inline legend-circle">
  <li style="--color-1: hsl(222, 88%, 55%);"><small>{{ report1-extractor.maxSizeInline['link-or-import'].name }}</small></li>
  <li style="--color-2: hsl(252, 88%, 55%);"><small>{{ report1-extractor.maxSizeInline['style'].name }}</small></li>
  <li style="--color-3: hsl(192, 88%, 55%);"><small>{{ report1-extractor.maxSizeInline['inline'].name }}</small></li>
</ul>
</div>
</div>
{% endif %}

<small>_This graph is interactive. You could tap or hover over bars to see extra information._</small>

The only site that does not load any External CSS file is Burnley’s site. Six sites load only a single External CSS file, including Brighton’s, Chelsea’s, Everton’s, Manchester’s, Newcastle’s, and Tottenham’s site. On the other hand, West Ham’s site loads 28 External CSS files, while two other sites load more than 10 External CSS files, Aston Villa’s and Liverpool’s sites.

All sites use at least one `<style>` tag. Sheffield’s and Aston Villa’s sites use more than 90 `<style>` tags, while Arsenal’s, Leicester’s, and Newcastle’s sites load only one `<style>` tag.

All sites use inline `style` attribute. Everton’s and Leicester’s sites use only a couple of `style` attributes, while Aston Villa’s, Fulham’s, and Sheffield’s sites use more than 50 `style` attributes.

## Top and Bottom Sites

Top three Premier League sites in terms of CSS file size are:

- Burnley,
- Wolves, and
- Fulham.

On the other side, the bottom three sites in terms of CSS file size are:

- Premier League
- Southampton, and
- Manchester United.

## The Conclusion

An average homepage of the Premier League site is bloated with CSS. If we think of the best practices in the web industry, we cannot see many sites use the best practices. Only a few sites might be rated as optimal or performant in terms of CSS code. The architecture and the structure of these sites might not be straightforward, but that does not mean that CSS should be ignored, or worse, disrespected.

It is interesting to see different approaches to loading the CSS, where some sites use only Style Tag CSS or External CSS, while others use many `<style>` tags and external CSS files. Although the loading technique might depend on the technology used to build these sites, CSS should not be abused or neglected.

Combining all CSS files in a single one, moving code from `<style>` tags and `style` attributes might seem daunting tasks, but it could be done. All it is takes is some respect and love for CSS.

[#RespectCSS](https://twitter.com/search?q=%23RespectCSS&src=typed_query)

## Related resources

- Article: [The Very First CSS Report About CSS File Sizes and File Count](/blog/the-very-first-css-report-about-css-file-sizes-and-file-count/)
- Report: [The CSS File Size and Count Report for Bundesliga sites](/reports/bundesliga-2021-03/)

## Complete Report

{% if report1-extractor %}
<div class="table-wrapper">
<table class="small">
  <tbody>
  <tr>
    <th></th>
    <th class="tar">Count</th>
    <th class="tar">Size</th>
    <th class="tar">Gzip</th>
  </tr>
  {% for item in report1-extractor.list %}
  <tr>
    <td colspan="4"><b>{{ item.site.title }}</b></td>
  </tr>
  {% if item['link-or-import'] %}
  <tr>
    <td>{{ item['link-or-import'].name }}</td>
    <td class="tar">{{ item['link-or-import'].count }}</td>
    <td class="tar">{{ item['link-or-import'].size | fileSize }}</td>
    <td class="tar">{{ item['link-or-import'].gzip | fileSize }}</td>
  </tr>
  {% endif %}
  {% if item['style'] %}
  <tr>
    <td>{{ item['style'].name }}</td>
    <td class="tar">{{ item['style'].count }}</td>
    <td class="tar">{{ item['style'].size | fileSize }}</td>
    <td class="tar">{{ item['style'].gzip | fileSize }}</td>
  </tr>
  {% endif %}
  {% if item['inline'] %}
  <tr>
    <td>{{ item['inline'].name }}</td>
    <td class="tar">{{ item['inline'].count }}</td>
    <td class="tar">{{ item['inline'].size | fileSize }}</td>
    <td class="tar">{{ item['inline'].gzip | fileSize }}</td>
  </tr>
  {% endif %}
  {% endfor %}
  </tbody>
</table>
</div>
{% endif %}
