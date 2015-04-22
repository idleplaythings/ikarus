module.exports = EventLog;

function EventLog () {
  this._log = [];
};

EventLog.prototype.addEntry = function (payload) {
  this._log.push(payload);
};