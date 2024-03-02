CREATE DATABASE blogs;
\c blogs;

CREATE TABLE IF NOT EXISTS blog_posts (
    blog_id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
		banner TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS external_links (
	url TEXT PRIMARY KEY NOT NULL,
	blog_id INT NOT NULL REFERENCES blog_posts(blog_id)
);
