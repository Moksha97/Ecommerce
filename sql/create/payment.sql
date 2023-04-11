CREATE TABLE payment
(
    payid           INT PRIMARY KEY AUTO_INCREMENT,
    paymentstatus   ENUM("SUCCESS", "PENDING", "FAILED", "REFUND") NOT NULL,
    userbankaccount VARCHAR(10) NOT NULL,
    FOREIGN KEY (userbankaccount) REFERENCES bankaccount (accountnumber)
);
