const filePath = "pcbanking (3) - Copy.csv";
const fs = require("fs");


fs.readFile(filePath, "utf-8", function (err, contents) {
  if (err) {
    throw (err);
  }

  const rows = contents.split("\n");

  for (let i = 1; i < rows.length-1; i++) {
    const columns = rows[i].split(",");

    if (columns.length >= 2) {
      const description = columns[1]; // Assuming the description column is the second column
      console.log(description);
    } else {
      throw new Error("Invalid CSV file structure. Description column not found in row.");
    }
  }
});
