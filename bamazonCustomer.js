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
        message: "What is the ID of the item you would like to purchase?",
        name: "option",

        // after asking for input, I need to be able to have the prompt appear underneath the table and run after the table is displayed
    }]).then(function(result){
        connection.query("SELECT * FROM bamazonInv WHERE id = ?", [result.option], (err, res) => {
            console.log("You have selected option: " + result.option);
            // after getting the ID from the option, ask how many customer would like to buy
            inquirer.prompt([{
                type: "input",
                message: "How many would you like to buy?",
                name: "qty",

            // function that checks to see if there are enough of that item in stock, checks the result of the qty prompt and makes sure its less than
            // the total stock quantity in the database
            }]).then(function(result) {
                console.log(result);
                console.log("Thank you for purchasing " + [result.qty] + "of ");
                
                
                
    //             if (result.qty < res[i].stock_quantity) {
    //                 // update database to reflect new amount in stock
    //                 // have to use some sort of math to subtract and update new quantity
    //                 updateInv();
    //                     function updateInv() {
    //                         var currentInv = res[i].stock_quantity;
    //                         var updatedInv = (res[i].stock_quantity - result.qty);
    //                         var query = connection.query(
    //                             "UPDATE bamazonInv SET ? WHERE ?",
    //                             [
    //                               {
    //                                 stock_quantity: currentInv
    //                               },
    //                               {
    //                                 stock_quantity: updatedInv
    //                               }
    //                             ],
    //                             function(err, res) {
    //                                 console.log("Stock Updated");
    //                                 // Call  AFTER the UPDATE completes
    //                               }
    //                             );
    //                     }
    //             } 
    //             else {
    //                 console.log("We are sorry, there aren't enough of that item in our inventory.");
    //             }
            })
        })
    })
}
    

