CREATE TABLE items (
  pid INT,
  oid INT,
  sid INT,
  price DECIMAL(10,2),
  quantity INT,
  FOREIGN KEY (pid) REFERENCES product(pid),
  FOREIGN KEY (oid) REFERENCES order(oid),
  FOREIGN KEY (sid) REFERENCES seller(sid)
);


ALTER TABLE items
ADD CONSTRAINT itemsid PRIMARY KEY (pid, sid, oid);