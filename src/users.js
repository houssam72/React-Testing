const axios = require("axios").default;

class Users {
  static all() {
    return axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((resp) => resp.data);
  }
}

module.exports = Users;
