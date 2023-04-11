CREATE TABLE `order`
(
    oid       INT PRIMARY KEY AUTO_INCREMENT,
    status    ENUM("PLACED", "PACKED", "INTRANSIT", "DELIVERED", "CANCELED") NOT NULL,
    timestamp DATETIME NOT NULL,
    username  varchar(40) NOT NULL,
    aid       INT NOT NULL,
    payid     INT UNIQUE NOT NULL,
    FOREIGN KEY (username) REFERENCES user (username),
    FOREIGN KEY (aid) REFERENCES address (aid),
    FOREIGN KEY (payid) REFERENCES payment (payid)
);
