CREATE TABLE userbank
(
    accountnumber VARCHAR(10),
    username      VARCHAR(40),
    primary key userbankid (accountnumber, username),
    FOREIGN KEY (accountnumber) REFERENCES bankaccount (accountnumber),
    FOREIGN KEY (username) REFERENCES user (username)
);
