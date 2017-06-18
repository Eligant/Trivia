const express = require('express');
const app = express();
const bodyParser= require('body-parser')
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./login-secret.json');
var mark=0;



app.set('view engine', 'ejs')

app.listen(process.env.PORT || 5000, function() {
  console.log('listening on 5000')
})


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {

	// Create a document object using the ID of the spreadsheet - obtained from its URL.
	var doc = new GoogleSpreadsheet('16p10gllBu5vEFlHODUvVXLlW8OVrFtD5kKM__krRY0Q');
	// Authenticate with the Google Spreadsheets API.
  	doc.useServiceAccountAuth(creds, function (err) {
  	// Get all of the rows from the spreadsheet.
  	doc.getRows(1, function (err, rows) {
    
    res.render('index.ejs', {data: rows})
  		});
	});



})

app.post('/engine', function(req, res) {

  
  	
  	// Create a document object using the ID of the spreadsheet - obtained from its URL.
	var doc = new GoogleSpreadsheet('16p10gllBu5vEFlHODUvVXLlW8OVrFtD5kKM__krRY0Q');
	// Authenticate with the Google Spreadsheets API.
  	doc.useServiceAccountAuth(creds, function (err) {
  	// Get all of the rows from the spreadsheet.

  	  doc.getRows(1, function (err, rows) {
	    
		for(var i=0; i < rows.length; i++) {
			if((rows[i].correctanswer)==(req.body[i])) mark= mark + 1;
		}


		var docwrt = new GoogleSpreadsheet('1gqGypYQiGIpiS1-8LZLGtPLDwMNaoBSklRS2YOMh6Q8');
	    // Authenticate with the Google Spreadsheets API.
	    docwrt.useServiceAccountAuth(creds, function (err) {
		
		  docwrt.addRow(1, { result: mark }, function(err) {
		
  		    if(err) {
    		  console.log(err);
 		    }
		  });
		  
		  res.render('result.ejs',{score:mark})
		  mark=0;

	    });

  	   });
       
	});

})







