CREATE TABLE payment
(
    payid           INT PRIMARY KEY,
    paymentstatus   VARCHAR(20),
    userbankaccount INT,
    FOREIGN KEY (userbankaccount) REFERENCES bankaccount (accountnumber)
);
