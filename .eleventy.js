const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const markdownIt = require('markdown-it')
const markdownItRenderer = new markdownIt()

const audit = require('./script/index')
const reports = require('./site/_data/reports')
const env = require('./site/_data/env')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(UpgradeHelper);

  const shortcodes = (str) => str.replace(/\[u\]/g, '<span class="highlight">').replace(/\[\\u\]/g, '</span>')

  const runMarkdown = (str) => shortcodes(markdownItRenderer.render(str))

  const runMarkdownInline = (str) => shortcodes(markdownItRenderer.renderInline(str))

  eleventyConfig.addLiquidFilter('markdownify', (str) => runMarkdown(str))

  eleventyConfig.addLiquidFilter('markdownifyi', (str) => runMarkdownInline(str))

  eleventyConfig.addLiquidFilter('extractorName', (str) => audit.getExtractorName(str))

  eleventyConfig.addLiquidFilter('fileSize', (str) => audit.getFileSize(str))

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    strictFilters: false,
  });

  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("blog/**/*.md");
  });

  eleventyConfig.addWatchTarget("assets");
  eleventyConfig.addWatchTarget("script");
  eleventyConfig.addPassthroughCopy({"assets/dist": "."})
  eleventyConfig.addPassthroughCopy({"assets/styleguide": "./styleguide"})
  eleventyConfig.addPassthroughCopy({"assets/favicon": "."})
  eleventyConfig.addPassthroughCopy({ "node_modules/charts.css/dist/charts.min.css": "css/charts.min.css"});

  audit.prepareData(reports)

  setTimeout(() => {
    audit.processData(reports.report1, 'report1')
    audit.processData(reports.report2, 'report2')
  }, 1000)

  return {
    dir: {
      input: 'site',
      output: 'public',
      layouts: '_layouts',
      data: '_data',
      htmlTemplateEngine: 'liquid',
      markdownTemplateEngine: 'liquid'
    }
  }
}
