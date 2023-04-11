CREATE TABLE seller
(
    sid           INT PRIMARY KEY AUTO_INCREMENT,
    sname         VARCHAR(20),
    accountnumber INT UNIQUE,
    FOREIGN KEY (accountnumber) REFERENCES bankaccount (accountnumber)
);
