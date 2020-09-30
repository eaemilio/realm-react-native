import {ObjectId} from 'bson';

class Task {
  constructor({title, status = Task.STATUS_OPEN, id = new ObjectId()}) {
    this._id = id;
    this.title = title;
    this.status = status;
  }

  static STATUS_OPEN = 'Open';
  static STATUS_IN_PROGRESS = 'InProgress';
  static STATUS_COMPLETE = 'Complete';

  static schema = {
    name: 'Task',
    properties: {
      _id: 'objectId',
      title: 'string',
      status: 'string',
    },
    primaryKey: '_id',
  };
}

export {Task};
