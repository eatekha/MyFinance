/*
This Machine Learning Model employs the Naive Bayes Algorithm, to categorize each transaction into both their keywords(for frontend) and category(for data visualization) utilizing 
the Natural.js library


* Pushes results to userTransactions.json
*/
/*
Categories = 
{   - Food & Dining
    - Entertainment
    - Groceries
    - Health, Fitness Personal Care
    - Shopping
    - Transfer
    - Transportation
    - Travel
    - Utilities
    - Other
  }
    */

  //import statements
  const fs = require("fs");

  const natural = require('../../natural/lib/natural');
  const keywordClassifier = new natural.BayesClassifier();
  const categoryClassifier = new natural.BayesClassifier();
  const filePath = 'src/backend/userTransactions.json'

  // External Dataset
  const data = require('./dataset.json');
  
  //Parameters used to classify
  data.forEach(item => {
    const { transaction, keyword, category, amount } = item;
    keywordClassifier.addDocument(transaction, keyword);
    categoryClassifier.addDocument([transaction, keyword, amount], category);
  });
  
  keywordClassifier.train();
  categoryClassifier.train();
  

  //function to add each classified element to userTransactions.json
  addKeywordToJSON();



  function addKeywordToJSON() {
    // Read the existing JSON file and parse its content
    const existingData = JSON.parse(fs.readFileSync(filePath));
  
    // Iterate through each object in the array and add the new key-value pair
    existingData.forEach((obj) => {
      const transaction = obj.transaction;
      const keyword = keywordClassifier.classify(transaction);
      const amount = obj.amount;
      obj.keyword = keyword;
      obj.category = categoryClassifier.classify([transaction, keyword, amount])
    });
  
    // Write the modified data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(existingData));
    console.log('userTransactions.json Updated');
    }
  
