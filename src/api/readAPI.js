//Split all categories into percentages

const pool = require('../backend/server')
const categories = [
    'Dining',
    'Entertainment',
    'Groceries',
    'Health, fitness et Personal Care',
    'Shopping',
    'Transfer',
    'Transportation',
    'Travel',
    'Utilities and home office',
    'Other'
  ];
  
// Iterate over the categories
categories.forEach(category => {
  const query = `
    SELECT
      (COUNT(*) FILTER (WHERE category = $1) * 100.0) / COUNT(*) AS category_percentage
    FROM
      transactions;
  `;
  const values = [category];

  pool.pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    const categoryPercentage = result.rows[0].category_percentage;
    console.log(`Percentage of ${category} transactions:`, categoryPercentage);
  });
});
