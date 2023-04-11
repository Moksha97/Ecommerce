CREATE TABLE bankaccount
(
    accountnumber VARCHAR(10) PRIMARY KEY,
    branchcode    VARCHAR(10) NOT NULL,
    bank          VARCHAR(50) NOT NULL,
    routingnumber VARCHAR(20) NOT NULL
);
