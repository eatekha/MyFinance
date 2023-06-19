let user_id;

function setUser(userID) {
  user_id = userID;
}

function getUser() {
  return user_id;
}

module.exports = {
  setUser,
  getUser
};


console.log(getUser());