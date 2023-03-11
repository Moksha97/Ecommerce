CREATE TABLE users (
    username VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL,
    lname VARCHAR(40) NOT NULL,
    fname VARCHAR(40) NOT NULL,
    isadmin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (username)
);