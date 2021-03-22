class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        index = this.data.findIndex(object => object.id === id)
        if (index != -1){
            return null
        }
        return this.data[index]
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        index = this.data.findIndex(object => object.id === id)
        if (index == -1){
            return false
        }
        this.data[index] = {...this.data[index], ...obj}
        return true
    }

    delete(id) {
        index = this.data.findIndex(object => object.id === id)
        if (index == -1){
            return false
        }
        this.data.splice(index, 1)
        return true
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;