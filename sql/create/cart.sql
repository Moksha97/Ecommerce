CREATE TABLE cart
(
    pid      INT,
    sid      INT,
    username VARCHAR(50),
    quantity INT,
    PRIMARY KEY cid (username, pid, sid),
    FOREIGN KEY (pid) REFERENCES product (pid),
    FOREIGN KEY (sid) REFERENCES seller (sid),
    FOREIGN KEY (username) REFERENCES user (username)

);
