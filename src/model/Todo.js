import {ObjectId} from 'bson';

class TodoModel {
  constructor(title, completed) {
    this.id = new ObjectId();
    this.title = title;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = TodoModel;
