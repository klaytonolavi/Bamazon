var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

// creating the connection to the mySQL database containing the bamazon_DB file.
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "gRack4bry",
    database: "bamazon_DB"
  });

  // checking for errors, then console logging confirmation that we are connected and running functions to display table and run prompt. 
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayTable();
});

// function for displaying the table containing the inventory of all items. 
function displayTable() {
    connection.query("SELECT * FROM bamazonInv", function(err, res) {
        
        console.log("---------------------------------------------------");
    
            console.table(res);
        
        console.log("-----------------------------------");
        runPrompt();
      });
    }

    // function which holds the inquirer prompt, asking which ID and quantity customer would like to purchase
function runPrompt() {
      inquirer.prompt([{
        type: "input",
        message: "What is the ID of the item you would like to purchase? (Press Q to quit)",
        name: "itemId",
      },
      {
          type: "input",
          message: "How many would you like to purchase?",
          name: "quantity"
      
    }]).then(function (transaction) {
        purchase(transaction.item_id, transaction.quantity);
    });
}

function purchase(itemId, quantity)
{
    connection.query('SELECT `stock_quantity`, `product_name`, `price` FROM `bamazonInv` WHERE `id` = ?',
    [itemId], (error, item) =>
    {
        if (error) throw error;
        if (item[0].stock_quantity >= quantity) {
            checkout(itemId, item[0].stock_quantity-quantity, quantity, item[0].product_name, item[0].price);
        } else {
            console.log('ERROR: ' + 'Not enough items in stock!');
            this.start();
        }
    });

    function checkout(itemId, quantity, amount, name, price) {
        connection.query('UPDATE `bamazonInv` SET ? WHERE ?',
        [{stock_quantity: quantity},{id: itemId}],
        (error, results, fields) =>
        {
            console.log('SUCCESS: ' + 'Your order of '+amount+' '+name+' for $'+price*amount+' has been placed.');
        });
        connection.end();
    }
}



    

