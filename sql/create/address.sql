CREATE TABLE address
(
    aid      INT AUTO_INCREMENT,
    line1    VARCHAR(255) NOT NULL,
    line2    VARCHAR(255),
    city     VARCHAR(255) NOT NULL,
    state    VARCHAR(50) NOT NULL,
    zip      INT NOT NULL,
    username VARCHAR(40) NOT NULL,
    PRIMARY KEY (aid),
    FOREIGN KEY (username) REFERENCES user (username)
);
