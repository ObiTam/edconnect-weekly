const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id
        this.name = name
        this.abstract = abstract
        this.authors = authors
        this.tags = tags
        this.createdBy = createdBy
    }
}

class Projects extends DataModel {
    validate(obj) {
        this.errors = []
        if (!obj.id){
            this.errors.push("id should not be empty")
        }
        if (!obj.name){
            this.errors.push("name should not be empty")
        }
        if (!obj.abstract){
            this.errors.push("abstract should not be empty")
        }
        if (!obj.createdBy){
            this.errors.push("createdby should not be empty")
        }
        if (!obj.authors || !Array.isArray(obj.authors)){
            this.errors.push("Authors should be an array")
        } 
        if (!obj.tags || !Array.isArray(obj.tags)){
            this.errors.push("Tags should be an array")
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
    Project,
    Projects
};