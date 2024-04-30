import axios from "axios";
import { BASE_URL } from "../testUtils";

export const BLOG_POST_URL = `${BASE_URL}/api/blogs`;

/**
 * Create a blog with the specified session token.
 *
 * @param {string} token
 * @param {Object} blog
 * @param {string} blog.title
 * @param {string} blog.content
 * @param {string|null} blog.banner
 * @returns {Promise<Blog>} The blog created
 */
export async function createBlog(token, blog) {
  const payload = {
    token,
    ...blog,
  };

  const response = await axios.post(BLOG_POST_URL, payload);

  return response.data;
}
