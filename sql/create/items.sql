CREATE TABLE items
(
    pid      INT NOT NULL,
    oid      INT NOT NULL,
    sid      INT NOT NULL,
    price    DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY itemsid (pid, sid, oid),
    FOREIGN KEY (pid) REFERENCES product (pid),
    FOREIGN KEY (oid) REFERENCES `order` (oid),
    FOREIGN KEY (sid) REFERENCES seller (sid)
);
