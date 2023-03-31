CREATE TABLE `order`
(
    oid       INT PRIMARY KEY,
    status    VARCHAR(20),
    timestamp DATETIME,
    username  varchar(40),
    aid       INT,
    payid     INT,
    FOREIGN KEY (username) REFERENCES user (username),
    FOREIGN KEY (aid) REFERENCES address (aid),
    FOREIGN KEY (payid) REFERENCES payment (payid)
);
