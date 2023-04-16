CREATE TABLE payment
(
    payid           INT PRIMARY KEY AUTO_INCREMENT,
    paymentstatus   ENUM("SUCCESS", "PENDING", "FAILED", "REFUND") NOT NULL,
    userbankaccount INT NOT NULL,
    FOREIGN KEY (userbankaccount) REFERENCES userbank (accountid)
);
