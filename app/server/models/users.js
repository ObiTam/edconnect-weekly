const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.matricNumber = matricNumber
        this.program = program
        this.graduationYear = graduationYear
    }

    getFullName() {
        return this.firstname + ' ' + this.lastname
    }
}

class Users extends DataModel {
    authenticate(email, password) {
        const user = this.getByEmail(email)
        return user.password === password
    }

    getByEmail(email) {
        const index = this.data.findIndex(user => user.email == email)
        return index != -1 ? this.data[index] : null
    }

    getByMatricNumber(matricNumber) {
        const index = this.data.findIndex(user => user.matricNumber == matricNumber)
        return index != -1 ? this.data[index] : null
    }

    validate(obj) {
        if (!obj.id || !obj.firstname || !obj.lastname || !obj.email || !obj.password || !obj.matricNumber || !obj.program || !obj.graduationYear){
            return false
        }
        if (this.getByEmail(obj.email) || this.getByMatricNumber(obj.matricNumber)){
            return false
        }
        if (obj.password.length < 7){
            return false
        }
        return true
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};