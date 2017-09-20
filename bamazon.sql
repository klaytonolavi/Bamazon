DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;


USE bamazon_DB;

CREATE TABLE bamazonInv (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER(30) NOT NULL,
    stock_quantity INTEGER(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("Hockey Stick", "Sporting Goods", 50, 5);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Glove", "Sporting Goods", 25, 10);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("Candlesticks", "Home Goods", 10, 25);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("Table Cloth", "Home Goods", 30, 7);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("Sony Flatscreen TV", "Electronics", 250, 3);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 300, 12);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("Cool Hockey T-Shirt", "Apparel", 12, 32);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("Black Beanie", "Apparel", 15, 24);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("G.I. Joe Action Figure", "Toys", 27, 30);

INSERT INTO bamazonInv (product_name, department_name, price, stock_quantity)
VALUES ("Barbie Princess Playhouse", "Toys", 700, 2);

SELECT * FROM bamazonInv;