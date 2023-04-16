CREATE TABLE cart
(
    pid      INT NOT NULL,
    sid      INT NOT NULL,
    username VARCHAR(40),
    quantity INT NOT NULL,
    PRIMARY KEY cid (username, pid, sid),
    FOREIGN KEY (pid) REFERENCES product (pid),
    FOREIGN KEY (sid) REFERENCES seller (sid),
    FOREIGN KEY (username) REFERENCES user (username)

);
