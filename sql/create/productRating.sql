CREATE TABLE productrating
(
    pid      INT NOT NULL,
    username VARCHAR(40) NOT NULL,
    rating   DECIMAL(3, 2) NOT NULL,
    PRIMARY KEY prid (pid, username),
    FOREIGN KEY (pid) REFERENCES product (pid),
    FOREIGN KEY (username) REFERENCES user (username)
);
