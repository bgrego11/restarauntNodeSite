// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// =============================================================


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});
// Sreturns table jsons
app.get("/api/table", function(req, res) {
   fs.readFile("tables.txt", "UTF8", function(err,data) {
        allTables = [];
       if (data) {
            var dataArr = data.split('\r\n');

            for (var i in dataArr) {
                if (dataArr[i] !== "") {
                    allTables.push(JSON.parse(dataArr[i]));
                }
            }
        };
        return res.json(allTables);


   })


});

//returns waitlist jsons
app.get("/api/waitlist", function(req, res) {
     fs.readFile("waitList.txt", "UTF8", function(err,data) {
        allTables = [];
        
        if (data) {
            var dataArr = data.split('\r\n');

            for (var i in dataArr) {
                if (dataArr[i] !== "") {
                    allTables.push(JSON.parse(dataArr[i]));
                }
            }
        };

        return res.json(allTables);


   })
  
});



// Create New reservations - takes in JSON input
app.post("/api/table", function(req, res) {


    var newTables = req.body;

    fs.readFile("tables.txt", "UTF8", function(err,data) {
        allTables = [];
        if (data) {
            var dataArr = data.split('\r\n');

            for (var i in dataArr) {
                if (dataArr[i] !== "") {
                    allTables.push(JSON.parse(dataArr[i]));
                }
            }
        };

        if ( allTables.length < 5) {
            saveReserve(newTables, "tables.txt")
        }
        else {
            saveReserve(newTables, "waitList.txt")
        }
    })
    res.json(true);

});



function saveReserve(table, file) {
   
   var tableString = JSON.stringify(table) + '\r\n';
   

   fs.appendFile(file, tableString, function(error) {
       if (error) {
           console.log(err);
       } else {
           newCards = [];
           console.log('table Saved!');
       }    
   });
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});