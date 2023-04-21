CREATE TABLE bankaccount
(
    accountid     INT         PRIMARY KEY AUTO_INCREMENT,
    accountnumber VARCHAR(10) NOT NULL,
    branchcode    VARCHAR(10) NOT NULL,
    bank          VARCHAR(50) NOT NULL,
    routingnumber VARCHAR(20) NOT NULL,
    bankaccount_isdeleted     BOOLEAN     NOT NULL DEFAULT FALSE
);
