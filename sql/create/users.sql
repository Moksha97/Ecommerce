CREATE TABLE `user`
(
    username VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL,
    lname    VARCHAR(40) NOT NULL,
    fname    VARCHAR(40) NOT NULL,
    isadmin  BOOLEAN     NOT NULL DEFAULT FALSE,
    phone    VARCHAR(40) NOT NULL,
    PRIMARY KEY (username)
);

-- Add prefrerredaddress to user table
ALTER TABLE `user`
ADD COLUMN preferredaddress INT DEFAULT NULL,
ADD FOREIGN KEY (preferredaddress) REFERENCES address (aid);

-- Add preferredaccount to user table
ALTER TABLE `user`
ADD COLUMN preferredaccount INT DEFAULT NULL,
ADD FOREIGN KEY (preferredaccount) REFERENCES userbank (accountid);