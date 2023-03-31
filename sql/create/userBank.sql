CREATE TABLE userbank
(
    accountnumber INT,
    username      VARCHAR(50),
    primary key userbankid (accountnumber, username),
    FOREIGN KEY (accountnumber) REFERENCES bankaccount (accountnumber),
    FOREIGN KEY (username) REFERENCES user (username)
);
