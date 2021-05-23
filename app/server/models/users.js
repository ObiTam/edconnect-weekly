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
        this.errors = []
        if (!obj.id){
            this.errors.push("id should not be empty")
        }
        if (!obj.firstname){
            this.errors.push("firstname should not be empty")
        }
        if (!obj.lastname){
            this.errors.push("lastname should not be empty")
        }
        if (!obj.email){
            this.errors.push("email should not be empty")
        }
        if (!obj.password){
            this.errors.push("password should not be empty")
        }
        if (!obj.matricNumber){
            this.errors.push("matric number should not be empty")
        }
        if (!obj.program){
            this.errors.push("program should not be empty")
        }
        if (!obj.graduationYear){
            this.errors.push("graduation year should not be empty")
        }
        if (this.getByEmail(obj.email)){
            this.errors.push("A user with email address already exists")
        }
        if (this.getByMatricNumber(obj.matricNumber)){
            this.errors.push("A user with specified matric number already exists")
        }
        if (obj.password.length < 7){
            this.errors.push("Password should have at least 7 characters")
        }
        
        if (this.errors.length > 0){
            return false
        }
        else{
            return true
        }
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};