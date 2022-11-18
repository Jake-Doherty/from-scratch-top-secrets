-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table
  if exists users;

drop table
	if exists secrets;


create table
	users (
		id bigint generated always as identity primary key,
		first_name varchar not null,
		last_name varchar not null,
		email varchar not null,
		password_hash varchar not null
	);

create table
	secrets (
		id bigint generated always as identity primary key,
		title varchar not null,
		description varchar not null,
		created_at varchar not null
	);

insert into
	secrets (title, description, created_at)
values
	('at velit vivamus vel nulla eget eros', 'venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris', '6/7/2022'),
	('elit sodales scelerisque mauris sit amet eros', 'donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices', '7/2/2022'),
	('sagittis dui vel', 'justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit', '10/9/2022'),
	('quis tortor id', 'pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus', '11/9/2022'),
	('odio donec', 'sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at', '4/17/2022'),
	('risus dapibus augue vel accumsan tellus nisi eu orci mauris', 'potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis', '3/10/2022'),
	('a pede posuere nonummy integer non velit donec', 'amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel', '4/24/2022'),
	('diam vitae quam suspendisse potenti nullam porttitor lacus at', 'eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl', '11/5/2022'),
	('ut nulla sed accumsan felis ut at', 'curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus', '7/24/2022'),
	('morbi quis tortor id nulla ultrices aliquet maecenas', 'sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel', '11/5/2022')