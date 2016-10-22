var mysql = require('mysql');
var inquirer = require('inquirer');
var currentChoices = [];
// var sqlkeys = require("./sqlkeys.js");

var lineBreaker = "--------------------------------------------------------------------------------------------------------------------------------";
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "emdepqua1224",
    // password: sqlkeys, //Your password
    database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("Connected as id " + connection.threadId);
	start();
});

function start(){
	inquirer.prompt([
		{
			type: "list",
			name: "executiveChoices",
			message: "What would you like to do?",
			choices: ["View the department product sales?", "Create a new department?"]
		}
	]).then(function(exeChoice){
		switch(exeChoice.executiveChoices){
			case "View the department product sales?":
				departmentSales();
				break;
			case "Create a new department?":
				newDepartment();
				break;
		}
	})
}



function newDepartment(){

}
// function start(){
// 	connection.query("SELECT * FROM products", function(err, res){
// 		if (err) {
// 			console.log(err);
// 		}else{
// 			// console.log(res);
// 			console.log("ItemID (ID) || ProductName (PN) || DepartmentName (DN) || Price (P) || StockQuantity (SQ)\n");
// 			for(var i=0; i < res.length; i++){
// 				var bamazonDisplay = "ID: " + res[i].ItemID + " || PN: " + res[i].ProductName + " || DN: " + res[i].DepartmentName + " || P: " + res[i].Price + " || SQ: " + res[i].StockQuantity + "\n"; 
// 				console.log(bamazonDisplay);
// 				var iAdder = i+1;
// 				currentChoices.push(iAdder.toString());
// 				// console.log(currentChoices);

// 			}
// 			firstPrompt(res, currentChoices);
// 		}
// 	});
// }
