/**
 * @typedef {Object} Blog
 * @property {number} id
 * @property {string} title
 * @property {Date} published
 * @property {string} content
 * @property {banner} banner
 */

import axios from "axios";
import { API_URL } from "./settings";
import { delay } from "./utils/general";

/**
 * @typedef {Object} BlogPreview
 * @property {number} id
 * @property {string} title
 * @property {Date} published
 * @property {banner} banner
 */

/**
 * Obtains blogs previews to display on the dashboard.
 * @returns {Promise<BlogPreview[]>}
 */
export const getBlogsPreviews = async () => {
  const url = `${API_URL}/blogs`;
  const { data } = await axios.get(url);
  // TODO: Simulated loading for suspense testing...
  await delay(1000);
  return data;
};

/**
 * Obtains the content of the blog.
 * @param {number} blogId - The id of the blog to retrieve the contents for
 * @returns {Promise<string>} Markdown string that contains the contents of the blog.
 */
export const getBlogContent = async (blogId) => {
  const url = `${API_URL}/blogs/${blogId}`;
  const { data } = await axios.get(url);
  return data.content;
};
