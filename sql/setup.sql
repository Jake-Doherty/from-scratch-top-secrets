-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table
 if exists users;

create table
	users (
		id bigint generated always as identity primary key,
		first_name varchar not null,
		last_name varchar not null,
		email varchar not null,
		password_hash varchar not null
	);
