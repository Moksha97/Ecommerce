CREATE TABLE userbank
(
    accountid     INT NOT NULL,
    username      VARCHAR(40) NOT NULL,
    primary key userbankid (accountid, username),
    FOREIGN KEY (accountid) REFERENCES bankaccount (accountid),
    FOREIGN KEY (username) REFERENCES user (username)
);
