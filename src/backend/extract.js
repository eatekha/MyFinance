/*This file is how we'll be extracting data from the csv file. The pcbanking(3).csv is the file until we're able to take user input
This edits files in userTransactions.json
*/

const filePath = 'src/backend/pcbanking (3).csv';
const fs = require("fs");
//Read in File
fs.readFile(filePath, "utf-8", function (err, contents) {
  if (err) {
    throw err;
  }

  //Variables
  var monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const rows = contents.split("\n");
  const transactions = [];
  const amounts = [];
  const dates = [];
  const months = [];
  
  //Extracting Data
  for (let i = 1; i < rows.length - 1; i++) {
    const columns = rows[i].split(",");

    if (columns.length >= 3) {
      const date = columns[0];
      const month = monthsArr[parseFloat(date.split('/')[0]) - 1];
      const transaction = columns[1]; // Assuming the description column is the second column
      const amount = parseFloat(columns[2]); // Assuming the amount column is the third column, 

      dates.push(date);
      months.push(month);
      transactions.push(transaction);
      amounts.push(amount);
        } else {
      throw new Error("Invalid CSV file structure. Description or amount column not found in row.");
    }
  }




const result = transactions.map((transaction, index) => {
  return {
    transaction: transaction,
    amount: amounts[index],
    date: dates[index],
    month: months[index]
  };
  
});
// Convert the result to JSON format
const jsonData = JSON.stringify(result);

// Save the JSON data to a file
fs.writeFile('src/backend/userTransactions.json', jsonData, (err) => {
  if (err) {
    console.error('Error saving result:', err);
  } else {
    console.log('Result saved to userTransactions.json');
  }
});
});

