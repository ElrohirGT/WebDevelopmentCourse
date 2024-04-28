CREATE TABLE blog_admin(
	username text not null primary key,
	password text not null
);

CREATE TABLE blog (
	id serial not null primary key,
	title text not null,
	content text not null,
	banner text
);
