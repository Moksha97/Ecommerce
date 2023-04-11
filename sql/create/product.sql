CREATE TABLE product
(
    pid       INT PRIMARY KEY AUTO_INCREMENT,
    pname     VARCHAR(50),
    pdesc     VARCHAR(200),
    pcategory ENUM("FASHION", "HOME", "TOYS", "HEALTH", "ELECTRONICS")
);
