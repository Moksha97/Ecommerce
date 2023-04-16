CREATE TABLE seller
(
    sid           INT PRIMARY KEY AUTO_INCREMENT,
    sname         VARCHAR(20) NOT NULL,
    accountid     INT NOT NULL,
    FOREIGN KEY (accountid) REFERENCES bankaccount (accountid)
);
