CREATE TABLE product
(
    pid       INT PRIMARY KEY,
    pname     VARCHAR(50),
    pdesc     VARCHAR(200),
    pcategory ENUM("FASHION", "HOME", "TOYS", "HEALTH", "ELECTRONICS")
);
