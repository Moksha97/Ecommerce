CREATE TABLE inventory(
    pid INT,
    sid INT,
    quantity INT,
    price DECIMAL(10,2),
    discount DECIMAL(5,2),
    FOREIGN KEY pid REFERENCES product(pid),
    FOREIGN KEY sid REFERENCES seller(sid)
);

ALTER TABLE inventory
ADD CONSTRAINT iid PRIMARY KEY (pid, sid);