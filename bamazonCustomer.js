// node modules and variable for selecting from mySQL easily
require("console.table");
var mysql = require("mysql");
var inquirer = require("inquirer");
var query = "SELECT * FROM bamazonInv WHERE ?";

// connection to mySQL 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gRack4bry",
  database: "bamazon_db"
});

// loads the table from mySQL and displays it in the console log for users to see
function loadTable() {
  connection.query("SELECT * FROM bamazonInv", function (err, res) {
    if (err) throw err;
    // using console.table module, display the bamazonInv table in a pretty way in the console.
    console.table(res);
    // runs the inquirer prompt for user input
    inventorySearch();
  });
}
loadTable();

function inventorySearch() {

// asks for user input 
  inquirer.prompt([
    {
      name: "item_id",
      type: "choices",
      message: "What is the id of the product you would like to buy?"
    },
    {
      name: "stock",
      type: "input",
      message: "Enter the quantity."
    }
  ]).then(function (answers) {
    
// variable to store the users answers to prompt
    let id = answers.item_id;
    let qty = answers.stock;
    updateStock();
    
// function that runs queries to mySQL to update the inventory, looks at current stock and checks that there is enough for the quantity chosen by the user

    function updateStock() {
      var query = "SELECT * FROM bamazonInv WHERE ?";
      var queryUpdate = "UPDATE bamazonInv SET ? WHERE ?";
      connection.query(query, {id: id }, function (err, res) {

        // checking if the quantity chosen by the user is less than the quantity in the mySQL database.
        var quantity = res[0].stock_quantity;
        if (quantity >= answers.stock) {
          quantity = quantity - answers.stock;

        // console logging the remaining stock by taking the users input and subtracting it from database stock
          console.log(`There is ${quantity} remaining.`);

        // variable that stores the total price by taking the price of the item and multiplying it by the users input of quantity
          var totalPrice =  res[0].price * answers.stock; 
          console.log("Thanks for purchasing! Your total is..." + "$" + totalPrice);
          console.log("----------------------------------");

        // query to update the database of the new stock quantity after what was purchased, than displays the new table with the updated inventory
          connection.query(queryUpdate,[{stock_quantity: quantity},{id: id}], function(err) {
            if (err) throw err;
            loadTable();
          })
          
        // if there are not enough items in the stock then give the user a message of insufficient quantity!
        } else {
          console.log("Insufficient quantity!");
          inventorySearch();
        }
      })
    }
  })
}