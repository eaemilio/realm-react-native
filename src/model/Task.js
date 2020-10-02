class Task {
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
