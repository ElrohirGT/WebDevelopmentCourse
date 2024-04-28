CREATE TABLE blog_admin(
	username text not null primary key,
	password text not null
);

CREATE TABLE sesion(
	token text not null primary key,
	start timestamp not null default NOW(),
	username text not null references blog_admin(username)
);

CREATE TABLE blog (
	id serial not null primary key,
	title text not null,
	content text not null,
	banner text
);
