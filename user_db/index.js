// Store connected users in heap
// TODO: Index with md5 hashes
class USER_HEAP {

  constructor() {
    this.users = {};
  }

  exists(username) {
    return (this.users[username] !== undefined)
  };

  addUser(data) {
    this.users[data.username] = data;
  }

  getUser(username) { 
    return { ... this.users[username] } || undefined
  }

};

module.exports = USER_HEAP;
