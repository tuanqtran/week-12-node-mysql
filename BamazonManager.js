var mysql = require('mysql');
var inquirer = require('inquirer');
var currentChoices = [];
var sqlkeys = require("./sqlkeys.js");
var lineBreaker = "--------------------------------------------------------------------------------------------------------------------------------";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    // password: "",
    password: sqlkeys.password, //Your password
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
			name: "managerChoices",
			message: "What would you like to do?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"] 
		}
	]).then(function(manager) {
		switch(manager.managerChoices){
			case "View Products for Sale":
				viewProducts();
				break;
			case "View Low Inventory":
				viewLowInv();
				break;
			case "Add to Inventory":
				addInv();
				break;
			case "Add New Product":
				addNewProduct();
				break;
			
		}
	})
}

function productList(res){
	console.log("ItemID (ID) || ProductName (PN) || DepartmentName (DN) || Price (P) || StockQuantity (SQ)\n");
	for(var i=0; i < res.length; i++){
		var bamazonDisplay = "ID: " + res[i].ItemID + " || PN: " + res[i].ProductName + " || DN: " + res[i].DepartmentName + " || P: " + res[i].Price + " || SQ: " + res[i].StockQuantity + "\n"; 
		console.log(bamazonDisplay);
		var iAdder = i+1;
		currentChoices.push(iAdder.toString());
	}
	console.log(lineBreaker);
}

function viewProducts(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) {
			console.log(err);
		}else{
			productList(res);
			restart();
		}
	});	
}

function viewLowInv(){
	connection.query("SELECT * FROM products WHERE StockQuantity < 5", function(err, res){
		if (err){
			console.log(err);
		}else{
			// console.log(res);
			console.log("------------------------------------- Low Inventory -------------------------------------");
			console.log("ItemID (ID) || ProductName (PN) || DepartmentName (DN) || Price (P) || StockQuantity (SQ)\n");
			res.forEach(function(id){
				console.log("ID: " + id.ItemID + " || PN: " + id.ProductName + " || DN: " + id.DepartmentName + " || P: " + id.Price + " || SQ: " + id.StockQuantity + "\n");
			});
			console.log(lineBreaker);

			restart();
		}
	});
}

function addInv(res){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) {
			console.log(err);
		}else{
			productList(res);
		    inquirer.prompt({
		        type: "list",
		        name: "addInv",
		        message: "Please select what id you would like to add.",
		        choices: currentChoices
		    }).then(function(idChoice) {
		    	var chosenVal = parseInt(idChoice.addInv - 1);
		    	console.log(lineBreaker);
			    console.log("You have chosen to add more into " + res[chosenVal].ProductName + " which currently has " + res[chosenVal].StockQuantity + " in stock.");
			    console.log(lineBreaker);
			    addInvAmount(res, chosenVal);
		    })	
		}
	});	
}

function addInvAmount(res, chosenVal){
	inquirer.prompt({
		type: "list",
		name: "howMany",
		message: "How many would you add into this product?",
		choices: ["1", "2", "3", "4", "5", "10", "25", "50", "100", "250", "500", "1000"]

	}).then(function(managerInput) {
		var userAmount = parseInt(managerInput.howMany);
		var addIntoInv = res[chosenVal].StockQuantity + userAmount;
		dataBaseAddInvUpdate(res, userAmount, addIntoInv, chosenVal);
	})		
}

function dataBaseAddInvUpdate(res, userAmount, addIntoInv, chosenVal){
	connection.query("UPDATE products SET ? WHERE ?", [
		{StockQuantity: addIntoInv},
		{ItemID: res[chosenVal].ItemID}
		]
	);
	logAddInv(res, userAmount, addIntoInv, chosenVal);
	restart();
}

function logAddInv(res, userAmount, addIntoInv, chosenVal){
	console.log(lineBreaker);
	console.log("You have added " + userAmount + " more units into product number " + res[chosenVal].ItemID + ". It now has " + addIntoInv +  " in stock.");
	console.log(lineBreaker);
}

function addNewProduct(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) {
			console.log(err);
		}else{
			productList(res);
			inquirer.prompt([
					{
						type: "input",
						name: "newProductName",
						validate: function(managerInput){
							if (managerInput.search(/([\S])+/g) === -1){
								console.log("\nPlease enter a valid input.");
							}else{
								return (managerInput.search(/([\S])+/g) !== -1);
							}
						},						
						message: "Please enter the name of your new product."
					},
					{
						type: "input",
						name: "newDepartmentName",
						validate: function(managerInput){
							if (managerInput.search(/([\S])+/g) === -1){
								console.log("\nPlease enter a valid input.");
							}else{
								return (managerInput.search(/([\S])+/g) !== -1);
							}
						},	
						message: "Please enter the name of the new product department."
					},
					{
						type: "number",
						default: "number",
						name: "newPrice",
						validate: function(managerInput){
							if ((managerInput.search(/^[\d\.]+$/)) === -1){
								console.log("\nPlease enter a valid number input.");
							}else{
								return (managerInput.search(/^[\d\.]+$/) !== -1);
							}
						},
						message: "Please enter the product price."
					},
					{
						type: "input",
						default: "number",
						name: "newStockQuantity",
						validate: function(managerInput){
							if ((managerInput.search(/^[\d]+$/)) === -1){
								console.log("\nPlease enter a valid whole number input.");
							}else{
								return (managerInput.search(/^[\d]+$/) !== -1);
							}				
						},
						message: "Please enter the quantity of the product stock."
					}
				]).then(function(managerProductInput){
					var addNewProductName = managerProductInput.newProductName;
					var addNewDepartmentName = managerProductInput.newDepartmentName;
					var addNewPrice = managerProductInput.newPrice;
					var addNewStockQuantity = managerProductInput.newStockQuantity;
					console.log(addNewProductName);
					console.log(addNewDepartmentName);
					console.log(addNewPrice);
					console.log(addNewStockQuantity);
					managerValidation(res, addNewProductName, addNewDepartmentName, addNewPrice, addNewStockQuantity);
				})
		}
	});	
	
}

function managerValidation(res, addNewProductName, addNewDepartmentName, addNewPrice, addNewStockQuantity){
	inquirer.prompt([
		{
			type: "confirm",
			name: "managerInputValidation",
			message: "Please confirm if the input you've placed is correct.\nProduct Name: " + addNewProductName + "\nDepartment Name: " + addNewDepartmentName + "\nPrice: " + addNewPrice + "\nStock Quantity: " + addNewStockQuantity + "\n"
		}
	]).then(function(managerInput){
		if (managerInput.managerInputValidation == true){
			dataBaseAddProductUpdate(res, addNewProductName, addNewDepartmentName, addNewPrice, addNewStockQuantity);
		}else{
			addNewProduct();
		}		
	})
}

function dataBaseAddProductUpdate(res, addNewProductName, addNewDepartmentName, addNewPrice, addNewStockQuantity){
	connection.query("INSERT INTO bamazon.products (ProductName, DepartmentName, Price, StockQuantity) VALUES ?",
		[[[addNewProductName, addNewDepartmentName, addNewPrice, addNewStockQuantity]]],
		function(err, res){
			if(err){
				console.log(err);
			}else{
				console.log("You've inserted your new product.");
				restart();
			}
		})
}

function restart(){
	inquirer.prompt([
		{
			type: "confirm",
			name: "restart",
			message: "Would you like to do more?"
		}
	]).then(function(managerInput){
		if (managerInput.restart == true){
			start();
		}else{
			console.log("Have a nice day.");
		}
	})
}


