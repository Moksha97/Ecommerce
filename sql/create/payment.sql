CREATE TABLE payment
(
    payid           INT PRIMARY KEY AUTO_INCREMENT,
    paymentstatus   ENUM("SUCCESS", "PENDING", "FAILED", "REFUND") NOT NULL,
    accountid       INT NOT NULL,
    FOREIGN KEY (accountid) REFERENCES userbank (accountid)
);
