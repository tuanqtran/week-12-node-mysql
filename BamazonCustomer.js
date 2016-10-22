var mysql = require('mysql');
var inquirer = require('inquirer');
var currentChoices = [];
var sqlkeys = require("./sqlkeys.js");

var lineBreaker = "--------------------------------------------------------------------------------------------------------------------------------";
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: sqlkeys.password, //Your password
    database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("Connected as id " + connection.threadId);
	start();
});

function start(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) {
			console.log(err);
		}else{
			// console.log(res);
			console.log("ItemID (ID) || ProductName (PN) || DepartmentName (DN) || Price (P) || StockQuantity (SQ)\n");
			for(var i=0; i < res.length; i++){
				var bamazonDisplay = "ID: " + res[i].ItemID + " || PN: " + res[i].ProductName + " || DN: " + res[i].DepartmentName + " || P: " + res[i].Price + " || SQ: " + res[i].StockQuantity + "\n"; 
				console.log(bamazonDisplay);
				var iAdder = i+1;
				currentChoices.push(iAdder.toString());
				// console.log(currentChoices);

			}
			firstPrompt(res, currentChoices);
		}
	});
}

function firstPrompt(res, currentChoices){
	// console.log(res);
    inquirer.prompt({
        type: "list",
        name: "idRequirement",
        message: "Please select what id you would like to buy.",
        // choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        choices: currentChoices
    }).then(function(idChoice) {
    	var chosenVal = parseInt(idChoice.idRequirement - 1);
    	if(res[chosenVal].StockQuantity <= 0){
    		console.log("This product is out of stock. Please select another.");
    		firstPrompt(res, currentChoices);
    	}else{
	    	console.log("You have chosen to purchase the " + res[chosenVal].ProductName + " which has " + res[chosenVal].StockQuantity + " available to purchase.");
	    	// console.log(typeof chosenVal);
	    	// console.log(res[chosenVal]);
	    	purchaseAmount(res, chosenVal);
    	}
    })
};

function purchaseAmount(res, chosenVal){
	// console.log(res);
	inquirer.prompt({
		type: "list",
		name: "howMany",
		message: "How many would you like to purchase?",
		choices: ["1", "2", "3", "4", "5", "10", "25", "50", "100", "250", "500", "1000"]
	}).then(function(userInput){
		// console.log(res[chosenVal]);
		var userAmount = parseInt(userInput.howMany);
		// console.log(res[chosenVal].ProductName);

		if(userAmount > res[chosenVal].StockQuantity || res[chosenVal].StockQuantity - userAmount < 0){
			console.log("This product only has " + res[chosenVal].StockQuantity + " available. Please select another amount.");
			purchaseAmount(res, chosenVal);
		}
		else{
			// console.log(typeof res[chosenVal].Price);
			var costOfProduct = res[chosenVal].Price * userAmount;
			var newProductAmount = res[chosenVal].StockQuantity - userAmount;
			dataBaseUpdate(res, chosenVal, newProductAmount, userAmount, costOfProduct);
			// logData(res, chosenVal, newProductAmount);
		}
	})
}

function dataBaseUpdate(res, chosenVal, newProductAmount, userAmount, costOfProduct){
	connection.query("UPDATE products SET ? WHERE ?", [
		{StockQuantity: newProductAmount},
		{ItemID: res[chosenVal].ItemID}
		]
	);

	logData(res, chosenVal, newProductAmount, userAmount, costOfProduct);
	restart();
}

function logData(res, chosenVal, newProductAmount, userAmount, costOfProduct){
	console.log(lineBreaker);
	console.log("You have chosen to buy " + userAmount + " products of the " + res[chosenVal].ProductName + ".");
	console.log(lineBreaker);			
	console.log("It will cost you " + "$" + costOfProduct + ".");
	console.log(lineBreaker);	
	console.log("There is only " + newProductAmount + " amount of this product left.");
	console.log(lineBreaker);
	console.log("The product " + res[chosenVal].ProductName + " now has " + newProductAmount + " left remaining.");
	console.log(lineBreaker);	
}

function restart(){
	inquirer.prompt([
		{
			type: "confirm",
			name: "restart",
			message: "Would you like to purchase more?"
		}
	]).then(function(userChoice){
		if (userChoice.restart == true){
			start();
		}else{
			console.log("Thank you! Please come again.");
		}
	})
}
