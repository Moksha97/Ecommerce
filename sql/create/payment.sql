CREATE TABLE payment
(
    payid           INT PRIMARY KEY AUTO_INCREMENT,
    paymentstatus   ENUM("SUCCESS", "PENDING", "FAILED", "REFUND"),
    userbankaccount VARCHAR(10),
    FOREIGN KEY (userbankaccount) REFERENCES bankaccount (accountnumber)
);
