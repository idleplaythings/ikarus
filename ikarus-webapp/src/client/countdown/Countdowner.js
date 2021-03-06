Countdowner = function Countdowner(source, format){
  this._time = null;
  this._handle = null;
  this.setTime(source);
  this._dependency = new Tracker.Dependency();
  this._stopped = false;
  this._format = format || "H:mm:ss";
  this._loop();
};

Countdowner.prototype.stop = function(){
  this._stopped = true;
  this._handle.stop();
}

Countdowner.prototype._loop = function(){
  this._dependency.changed();
  if (! this._stopped) {
    Meteor.setTimeout(this._loop.bind(this), 1000);
  };
}

Countdowner.prototype.setTime = function(source) {
  this._handle = Tracker.autorun(function(){
    this._time = source();
  }.bind(this));
};

Countdowner.prototype.getTime = function() {
  this._dependency.depend();

  if (! this._time) {
    return "";
  }

  var now = moment();
  var time = this._time.clone();

  if (now.isBefore(this._time)){
    return time.subtract(now).format(this._format)
  } else {
    return now.subtract(time).format(this._format)
  }

};
