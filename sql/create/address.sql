CREATE TABLE address
(
    aid      INT NOT NULL AUTO_INCREMENT,
    line1    VARCHAR(255),
    line2    VARCHAR(255),
    city     VARCHAR(255),
    state    VARCHAR(50),
    zip      INT,
    username VARCHAR(255),
    PRIMARY KEY (aid),
    FOREIGN KEY (username) REFERENCES user (username)
);
