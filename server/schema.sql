CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  id INTEGER PRIMARY KEY auto_increment,
  username VARCHAR(14) not null 
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY auto_increment,
  roomname VARCHAR(14) not null
);

CREATE TABLE messages (
  /* Describe your table here.*/
  /* name of user id*/
  user_id INTEGER,
  /* foreign key name of user id and reference to USERS table's id*/
  FOREIGN KEY (user_id) REFERENCES users(id),
  /* name of room id*/
  room_id INTEGER,
  /* foreign key name of user id and reference to USERS table's id*/
  FOREIGN KEY (room_id) REFERENCES rooms(id),
  messages VARCHAR(140) not null
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u student -p < server/schema.sql
 *  to create the database and the tables.*/

