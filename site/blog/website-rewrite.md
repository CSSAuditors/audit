---
layout: post
title: How I built and rewrote the CSS Auditors website
description: Last year I started this website. It was supposed to be my favorite side project, but instead, it became my nightmare. Let me tell you why and how I got to the right track.
image: /gfx/how-i-built-and-rewrote-the-css-auditors-website.jpg
date: 2022-03-02
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

Last year I started this website. It was supposed to be my favorite side project, but instead, it became my nightmare. Let me tell you why and how I got to the right track.

## Background

The idea about this site didn’t come over the night. I remember how excited I was when I saw [The Project Wallace](https://www.projectwallace.com/) for the first time. I thought it was so cool, and I should somehow use it in my favor. The problem was I couldn’t figure out how.

Nothing really happened until I completed [Paul Boag's masterclass “Finding clients”](https://boagworld.com/products/finding-clients/). Paul Boag advises combining favorite hobbies, interests, passions, and professional skills to get the perfect client. Or something like that. That made me think about my strongest programming skill, CSS, and my interest in sports, to be more precise, in football. So it didn’t take too long when I came up with the project: I will audit all football clubs’ websites CSS and write about my findings.

## Early days

Being the world-class talent I am, I didn’t want to audit these websites manually, meaning I didn’t want to enter each site in The Project Wallace. Instead, I wanted to do it programmatically. So, I started to write these scripts that will scrape all the data about CSS that I could think of: from file sizes to code coverage to warnings and errors. Once I had all the data, I needed to analyze the data, add some graphs, and write the reports.

Since I decided to use 11ty as my static site generator, I used Node.js scripts to generate tables and graphs and then load them inside 11ty. I created new Liquid filters, and then all I needed to do was use this new shortcode to display graphs and tables. Here’s the graph example:

```javascript
const charts = (str, object, type) => {
  const key = `${object}-chart`

  if(!globalVars.hasOwnProperty(key)) {
    globalVars[key] = `window.Highcharts.chart('${str}', ${variable('$html' + str, object, type)});`
  } else {
    globalVars[key] += `\nwindow.Highcharts.chart('${str}', ${variable('$html' + str, object, type)});`
  }
}

eleventyConfig.addLiquidFilter('chartize', (str, object, type) => {
  charts(str, object, type)

  return `<div class="chart" id="${str}"></div>`
})
```

```liquid
{% raw %}{{ elem.chart.item | chartize: object, elem.chart.type }}{% endraw %}
```

I can’t even figure out this code, and I wrote it last year. 🤯

An additional problem was these reports were markdown files, but I used only the frontmatter part of the markdown. I created sections for text, graphs, tables, additional info like the author’s bio and social shares. That made the frontmatter part quite repetitive and ugly because of the indents. When my friend Ivan wanted to write the following report, he had many problems with the frontmatter syntax. I had to jump in and format everything.

After this second report, I didn’t want to return to the project for months. Or, when I eventually did, I gave up because I couldn’t believe that I created this monster that even I had problems using.

A new football season started, some clubs left the league, and some new ones were promoted. So, going forward with the reports seemed even more challenging and meaningless.

## New days

Sometime this winter, I started learning more and more about 11ty and its possibilities. It was the time when I unfollowed everyone on Twitter (more than two thousand accounts). One of the first persons I followed back was [Zach Leatherman](https://twitter.com/zachleat) and his project, [11ty](https://twitter.com/eleven_ty). I saw a lot of retweets, articles, and posts about 11ty.

The breakthrough moment was when I figured that I didn’t need Node.js to give me the HTML code. Instead, I needed Node.js only to generate JSON files. Then I could use these JSON files inside my Liquid templates to display graphs, tables, and other data. Something like this:

```liquid
{% raw %}{%- if report -%}
  <table>
    <thead>
      <tr>
        <th>Site</th>
        <th>Size</th>
        <th>Gzip</th>
      </tr>
    </thead>
    <tbody>
      {%- for item in report -%}
        <tr>
          <td>{{ item.site.title }}</td>
          <td>{{ item.site.size | fileSize }}</td>
          <td>{{ item.site.gzip | fileSize }}</td>
        </tr>
      {%- endfor -%}
    </tbody>
  </table>
{%- endif -%}{% endraw %}
```

So I rewrote the Node.js scripts to store all relevant data in JSON files in the [global data folder](https://www.11ty.dev/docs/data-global/) to be more precise. Since 11ty could read these files, I needed to write Liquid partials that would output tables and graphs. I couldn’t believe how I didn’t think of it earlier. All I needed to do to include the partial from the markdown file was to write the following snippet:

```liquid
{% raw %}{% render report/general-site-list, report: reports.report3 %}{% endraw %}
```

As a final part of these rewrites, I wanted to eliminate [Highcharts.js](https://www.highcharts.com/) and replace it with [ChartsCSS](https://chartscss.org/). This is the site about CSS, after all. I find ChartsCSS somewhat limiting compared to Highcharts.js, but I think it serves its purpose for this site.

So here’s how the report looked [before](https://web.archive.org/web/20210315134658/https://css-auditors.com/reports/bundesliga-2021-03/).
And here’s how it looks [now](/reports/bundesliga-2021-03/).

## Conclusion

I don’t know what I learned from this process, but I am happy with things now. I certainly look forward to writing much more CSS reports this year, so be sure to follow us [on Twitter](https://twitter.com/CSSAuditors) for updates.

[#RespectCSS](https://twitter.com/search?q=%23RespectCSS&src=typed_query)
