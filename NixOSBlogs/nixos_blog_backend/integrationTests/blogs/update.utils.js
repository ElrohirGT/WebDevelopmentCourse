import axios from "axios";
import { BASE_URL } from "../testUtils";
export const BLOG_UPDATE_ENDPOINT = `${BASE_URL}/api/blogs`;

/**
 * Updates a blog with the specified session token.
 *
 * @param {string} token
 * @param {Object} blog
 * @param {number} blog.id
 * @param {string} blog.title
 * @param {string} blog.content
 * @param {string|null} blog.banner
 * @returns {Promise<Blog>} The blog created
 */
export async function updateBlog(token, blog) {
  const payload = {
    token,
    blog,
  };

  const response = await axios.put(BASE_URL, payload);

  return response.data;
}
