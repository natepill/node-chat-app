

class Users {
    constructor() {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room}
        this.users.push(user)
        return user;
    }
    removeUser (id) {
        var users = this.user.filter((user) => user.room === room);
        var namesArray = users. 
    }

    getUser () {

    }
    getUserList() {
        //Gets list of users by room specified
        var users = this.users.filter((user) => user.room = room);
        var namesArray = users.map((user) => return user.name)

        return namesArray
    }
}

module.exports = {Users}
