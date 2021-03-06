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
    $push: {
      queue: squad._id
    }
  });
};

ServerQueue.prototype.getLength = function() {
  var queue = this.getQueue();
  return queue.length;
};

ServerQueue.prototype.getLengthOfUniqueCompanies = function() {
  var companyIds = [];
  var queue = this.getQueue().filter(function(squad) {
    if (companyIds.indexOf(squad.getCompanyId()) > -1) {
      return false;
    }

    companyIds.push(squad.getCompanyId());
    return true;
  });

  return queue.length;
};

ServerQueue.getBySquad = function (squad) {
  return ServerQueue.fromDoc(
    collections.ServerQueueCollection.findOne({queue: {$in: [squad._id]}})
  );
};

ServerQueue.getByRegion = function (region) {
  return ServerQueue.fromDoc(
    collections.ServerQueueCollection.findOne({region: region})
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