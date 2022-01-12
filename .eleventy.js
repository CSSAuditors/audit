const markdownIt = require('markdown-it')
const markdownItRenderer = new markdownIt()
const env = require('./site/_data/env')
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(UpgradeHelper);

  const shortcodes = (str) => str.replace(/\[u\]/g, '<span class="highlight">').replace(/\[\\u\]/g, '</span>')

  const runMarkdown = (str) => shortcodes(markdownItRenderer.render(str))

  const runMarkdownInline = (str) => shortcodes(markdownItRenderer.renderInline(str))

  eleventyConfig.addLiquidFilter('markdownify', (str) => runMarkdown(str))

  eleventyConfig.addLiquidFilter('markdownifyi', (str) => runMarkdownInline(str))

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    strictFilters: false,
  });

  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("blog/**/*.md");
  });


  eleventyConfig.addWatchTarget("assets");
  eleventyConfig.addPassthroughCopy({"assets/dist": "."})
  eleventyConfig.addPassthroughCopy({"assets/styleguide": "./styleguide"})
  eleventyConfig.addPassthroughCopy({"assets/favicon": "."})

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
