CREATE TABLE userbank (
  accountnumber INT,
  username VARCHAR(50),
  FOREIGN KEY (accountnumber) REFERENCES bankaccount(accountnumber),
  FOREIGN KEY (username) REFERENCES user(username)
);


ALTER TABLE userbank
ADD CONSTRAINT userbankid PRIMARY KEY (accountnumber, username);