CREATE TABLE seller
(
    sid           INT PRIMARY KEY,
    sname         VARCHAR(20),
    accountnumber INT,
    FOREIGN KEY (accountnumber) REFERENCES bankaccount (accountnumber)
);
