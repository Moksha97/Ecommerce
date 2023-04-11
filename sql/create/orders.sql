CREATE TABLE `order`
(
    oid       INT PRIMARY KEY AUTO_INCREMENT,
    status    ENUM("PLACED", "PACKED", "INTRANSIT", "DELIVERED", "CANCELED"),
    timestamp DATETIME,
    username  varchar(40),
    aid       INT,
    payid     INT UNIQUE,
    FOREIGN KEY (username) REFERENCES user (username),
    FOREIGN KEY (aid) REFERENCES address (aid),
    FOREIGN KEY (payid) REFERENCES payment (payid)
);
