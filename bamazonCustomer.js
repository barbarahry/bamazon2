var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
  
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  readProducts();
  //start();
});


function readProducts() {
  console.log("\n Displaying all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    //console.log(res);
    //*
    for (var i=0; i<res.length; i++) {
     // console.log(res);
      console.log("Product ID Number: " + res[i].id + "   Name: " + res[i].product_name + "  Price: $" + res[i].price);
    }; //*/
    Lookup();
    //connection.end();
  });
}


function Lookup() {
  var questions = [
    {
      type: 'input',
      name: 'id',
      message: '\n Type in Id Number of the product from products displayed above'

    },
    {
      type: 'input',
      name: 'stock_quantity',
      message: '\n How many?',
    },
  ];
  inquirer.prompt(questions).then(function (res) {
    var buyingStock = parseFloat(res.stock_quantity);
    var databaseStock = 0;
    var itemId = res.id;
    connection.query("SELECT * FROM products WHERE ?", [{ id: itemId }], function (err, res) {
      if (err) throw err;
      // Pull stock number
      //console.log(res)
      databaseStock = parseFloat(res[0].stock_quantity);
      if (databaseStock != 0 && databaseStock >= buyingStock) {
console.log("\nProduct price is: $" + res[0].price + "  Your total order is :$" + buyingStock*res[0].price +"\nThank you for coming.");

        connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: databaseStock - buyingStock }, { id: itemId }], function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
         // console.log(res);
          connection.end();
        });
      }
      else {
        console.log("\n Sorry but we need to add to our inventory. \n When the manager finally shows up, \n we sincerely hope she will know how to do it.\n Please try another item.");
      }
    })
    //console.log(databaseStock + " " + buyingStock)
  })
};


