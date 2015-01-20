ServerQueue = function (args) {
  this._id = args._id;
}

ServerQueue.prototype.removeSquadFromQueue = function(squad) {
  collections.ServerQueueCollection.update({
    _id: this._id
  }, {
    $pull: {
      queue: squad._id
    }
  });
};

ServerQueue.prototype.shiftFromQueue = function() {
  var squad = this.getQueue().shift();
  collections.ServerQueueCollection.update({
    _id: this._id
  }, {
    $pull: {
      queue: squad._id
    }
  });

  return squad;
}

ServerQueue.prototype.getQueue = function() {
  var ids = get(this.getDoc(), 'queue') || [];
  return ids.map(Squad.getById);
}

ServerQueue.prototype.addToQueue = function(squad) {
  if (! squad) {
    throw new Error("squad is falsy");
  }
  collections.ServerQueueCollection.update({
    _id: this._id
  }, {
    $addToSet: {
      queue: squad._id
    }
  });
};

ServerQueue.prototype.getLength = function() {
  var queue = this.getQueue();
  return queue.length;
};

ServerQueue.getByRegion = function (region) {
  return ServerQueue.fromDoc(
    collections.ServerQueueCollection.findOne({})
  );
};

ServerQueue.fromDoc = function(doc) {
  if (Boolean(doc) === false) {
    return null;
  }

  return new ServerQueue(doc);
};

ServerQueue.prototype.getDoc = function() {
  return collections.ServerQueueCollection.findOne({ _id: this._id });
}