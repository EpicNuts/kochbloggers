const markdownIt = require("markdown-it");
const md = new markdownIt({ html: true });

module.exports = function (eleventyConfig) {
  // Passthrough copy static assets from project root into _site/
  eleventyConfig.addPassthroughCopy({ "styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "logo.png": "logo.png" });

  // Filter: render inline markdown (used for tips strings in frontmatter)
  eleventyConfig.addFilter("md", (value) => md.renderInline(String(value ?? "")));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
