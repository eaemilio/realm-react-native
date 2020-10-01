import {ObjectId} from 'bson';

class Task {
  constructor({title, status = Task.STATUS_OPEN, id = new ObjectId(), partitionValue}) {
    this._id = id;
    this.title = title;
    this.status = status;
    this._partitionValue = partitionValue;
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
      _partitionValue: 'string'
    },
    primaryKey: '_id',
  };
}

export {Task};
