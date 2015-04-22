EventLog = function EventLog (args) {
  if (! args) {
    args = {};
  }

  this._log = args._log || [];
};