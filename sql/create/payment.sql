CREATE TABLE payment
(
    payid           INT PRIMARY KEY,
    paymentstatus   ENUM("SUCCESS", "PENDING", "FAILED", "REFUND"),
    userbankaccount INT,
    FOREIGN KEY (userbankaccount) REFERENCES bankaccount (accountnumber)
);
