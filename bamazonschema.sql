DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
 id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Honda", "cars", 100, 10), ("Ford", "cars", 99, 10), ("Toyota", "cars", 98, 10),("Dodge", "cars", 97, 10),
("BMW", "cars", 96, 10),("Mercedez", "cars", 95, 10),("Bentley", "cars", 94, 10),("Volvo", "cars", 93, 10),
("Fiat", "cars", 92, 10),("Subaru", "cars", 91, 10);