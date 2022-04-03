CREATE DATABASE Wedding_RSVP_App;
USE Wedding_RSVP_App; 
DROP TABLES IF EXISTS users, user_contact, rsvp_sent, reservations;

CREATE TABLE users ( 
user_id int auto_increment NOT NULL UNIQUE,
user_name varchar(15) NOT NULL UNIQUE,
first_name varchar (255) NOT NULL, 
last_name varchar(255) NOT NULL, 
email varchar(50) NOT NULL UNIQUE,
age int,
user_password varchar(50) NOT NULL,
permissions varchar(10) DEFAULT 'guest', 
PRIMARY KEY (user_id)
);

CREATE TABLE user_contact ( 
user_id int NOT NULL UNIQUE,
users_phone1 varchar(50),
users_phone2 varchar(50),
address varchar(100),
city varchar(50),
county varchar(50),
state varchar(50),
zip varchar(50),
PRIMARY KEY(user_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE rsvp_sent (
user_id int NOT NULL,
guest_id int auto_increment NOT NULL UNIQUE,
guest_first_name varchar (255) NOT NULL,
guest_last_name varchar (255) NOT NULL,
guest_rsvp_answer varchar(5),
PRIMARY KEY (guest_id), 
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE reservations (
reservation_id int auto_increment NOT NULL, 
user_id int NOT NULL,
guest_id int NOT NULL,
guest_first_name varchar (255) NOT NULL,
guest_last_name varchar (255) NOT NULL,
age int,
PRIMARY KEY (reservation_id), 
FOREIGN KEY (guest_id) REFERENCES rsvp_sent(guest_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE ON UPDATE NO ACTION
);





