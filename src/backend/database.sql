CREATE
//R
INSERT INTO usertable (user_name, user_password) VALUES ($1, $2)'


//get user id

SELECT user_id
FROM your_table_name
WHERE user_name = 'provided_user_name' AND password = 'provided_password';




CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY,
    user_id INT,
    transaction VARCHAR(255),
    amount INT,
    category VARCHAR(255),
    month VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES usertable(user_id)
);
