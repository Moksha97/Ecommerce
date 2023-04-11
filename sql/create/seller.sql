CREATE TABLE seller
(
    sid           INT PRIMARY KEY AUTO_INCREMENT,
    sname         VARCHAR(20) NOT NULL,
    accountnumber VARCHAR(10) UNIQUE NOT NULL,
    FOREIGN KEY (accountnumber) REFERENCES bankaccount (accountnumber)
);
