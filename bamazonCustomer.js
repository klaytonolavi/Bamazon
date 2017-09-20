var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "gRack4bry",
    database: "bamazon_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayTable();
  });

function displayTable() {
    connection.query("SELECT * FROM bamazonInv", function(err, res) {
        console.log("ID  " + "Product Name " + "Dept. Name " + "Price " + "Stock Quantity");
        console.log("---------------------------------------------------");
            for (var i = 0; i < res.length; i++) {
             console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
      });
      connection.end();
    }


//   inquirer.prompt([{
//     type: "input",
//     message: "What is the ID of the item you would like to purchase?",
//     name: "option",
// }]).then(function(result){
//     if(result.choice === "Post an item")
//     {
//         postCreate();
//     }
//     else{
//         postList();
//     }
// });