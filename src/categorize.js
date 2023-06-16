/*
This Machine Learning Model employs the Naive Bayes Algorithm, to categorize each transaction into both their keywords(for frontend) and category(for data visualization) utilizing 
the Natural.js library
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
  const natural = require('../natural');
  const keywordClassifier = new natural.BayesClassifier();
  const categoryClassifier = new natural.BayesClassifier();
  
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
  
  const transaction = "D2D GROUP ONEX BUS       BRAMPTON     ON";
  const keyword = keywordClassifier.classify(transaction);
  const category = categoryClassifier.classify([transaction,keyword, 23.4]);

  console.log(keyword);
  console.log(category);



  //Save