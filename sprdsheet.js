var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./login-secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('16p10gllBu5vEFlHODUvVXLlW8OVrFtD5kKM__krRY0Q');

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {

  // Get all of the rows from the spreadsheet.
  doc.getRows(1, function (err, rows) {
    //console.log(rows);

    console.log(rows[0]);
  });
});