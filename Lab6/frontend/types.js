/**
 * @typedef Blog
 * @type {Object}
 * @property {number} blog_id
 * @property {string} title
 * @property {string} banner
 * @property {string} content
 * @property {string} created_at
 * @property {string[]} links
 */

/**
 * Constructor for the Blog type
 * @param {string} title Title of the blog
 * @param {string} banner Base64 image banner of the blog
 * @param {string} content Markdown content of the blog
 * @param {string[]} links List of external links of the blog
 */
const Blog = (title, banner, content, links) => {
  return {
    title,
    banner,
    content,
    links,
  };
};

/**
 * @typedef BlogDisplayProps
 * @type {object}
 * @property {Blog} blog
 */

/**
 * Creates a promise that waits for a specified amount of ms.
 */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
