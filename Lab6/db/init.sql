-- Creating database
CREATE DATABASE blogs;
\c blogs;

-- Creating tables
CREATE TABLE IF NOT EXISTS blog_posts (
    blog_id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
		banner TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS external_links (
	url TEXT PRIMARY KEY NOT NULL,
	blog_id INT NOT NULL REFERENCES blog_posts(blog_id)
);

-- Assigning permissions to user backend
-- This is one after creating the tables, if done before it won't work
CREATE USER backend WITH PASSWORD 'backend';
REVOKE ALL ON DATABASE blogs FROM backend;
GRANT CONNECT ON DATABASE blogs TO backend;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO backend;

-- Insert test blog
INSERT INTO blog_posts (title, content) VALUES 
('Test Example Blog', 'Contenido de este blog, lo sé es bien corto :(');
