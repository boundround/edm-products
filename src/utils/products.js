const GoogleSpreadsheet = require('google-spreadsheet');
//https://docs.google.com/spreadsheets/d/e/2PACX-1vSntCTOmZ_mt1qg-dCesbV9qubCN5vXRxpoVVrSmXhNIbw7H8NrM1L6WEMV7fDc6CHz5glEcQtm17UC/pubhtml

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SECRET);

const getProducts = (callback) => {
  doc.getRows(1, {
    offset: 1
  }, (err, rows) => {
    if (err) {
      callback('Unable to connect', undefined)
    } else {
      callback(undefined, rows)
    }
  });
}

module.exports = getProducts;