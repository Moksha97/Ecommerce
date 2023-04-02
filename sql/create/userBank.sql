CREATE TABLE userbank
(
    accountnumber INT,
    username      VARCHAR(40),
    primary key userbankid (accountnumber, username),
    FOREIGN KEY (accountnumber) REFERENCES bankaccount (accountnumber),
    FOREIGN KEY (username) REFERENCES user (username)
);
