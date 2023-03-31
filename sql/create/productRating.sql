CREATE TABLE productrating (
  pid INT,
  username VARCHAR(50),
  rating DECIMAL(3,2),
  FOREIGN KEY (pid) REFERENCES product(pid),
  FOREIGN KEY (username) REFERENCES user(username)
);


ALTER TABLE productrating
ADD CONSTRAINT prid PRIMARY KEY (pid, username);