CREATE TABLE cart (
  pid INT,
  sid INT,
  username VARCHAR(50),
  quantity INT,
  FOREIGN KEY (pid) REFERENCES product(pid),
  FOREIGN KEY (sid) REFERENCES seller(sid),
  FOREIGN KEY (username) REFERENCES user(username)
  
);


ALTER TABLE cart
ADD CONSTRAINT cid PRIMARY KEY (username, pid, sid);
