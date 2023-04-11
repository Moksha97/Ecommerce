CREATE TABLE inventory
(
    pid      INT,
    sid      INT,
    quantity INT NOT NULL,
    price    DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY iid (pid, sid),
    FOREIGN KEY (pid) REFERENCES product (pid),
    FOREIGN KEY (sid) REFERENCES seller (sid)
);
