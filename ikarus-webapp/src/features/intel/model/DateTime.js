DateTime = function DateTime(args) {
  if (args) {
    this.year = args.year;
    this.month = args.month;
    this.day = args.day;
    this.hour = args.hour;
    this.minute = args.minute;
  } else {
    this.init();
  }
};

DateTime.prototype.advance = function() {
  var nextTimes = this.getNextTimeTypes();

  var randomValue = Math.random();
  var nextTimeType = null;

  nextTimes.reduce(function(prev, current) {
    if (!nextTimeType && randomValue <= prev + current.probability) {
      nextTimeType = current.time;
    }

    return prev + current.probability;
  }, 0);

  return new nextTimeType();
};

DateTime.fromDoc = function(doc) {
  switch (doc.type) {
    case 'Dawn':
      return new Dawn(doc);
    case 'Noon':
      return new Noon(doc);
    case 'Dusk':
      return new Dusk(doc);
    case 'Evening':
      return new Evening(doc);
    case 'Night':
      return new Night(doc);
  }
};

DateTime.getRandom = function() {
  var times = [Dawn, Noon, Dusk, Evening, Night];
  return new times[Math.floor(Math.random() * times.length)]();
};

Dawn = function(args) {
  this.type = 'Dawn';
  DateTime.call(this, args);
}

Dawn.prototype = Object.create(DateTime.prototype);

Dawn.prototype.getNextTimeTypes = function() {
  return [
    { time: Dawn, probability: 0.3 },
    { time: Noon, probability: 0.7 },
  ];
};

Dawn.prototype.init = function() {
  this.year = '2035';
  this.month = '11';
  this.day = '3';
  this.hour = Math.round(5 + Math.random()).toString();
  this.minute = Math.round(Math.random() * 59).toString();
};

Noon = function(args) {
  this.type = 'Noon';
  DateTime.call(this, args);
};

Noon.prototype = Object.create(DateTime.prototype);

Noon.prototype.getNextTimeTypes = function() {
  return [
    { time: Noon, probability: 0.6 },
    { time: Dusk, probability: 0.4 },
  ];
};

Noon.prototype.init = function() {
  this.year = '2035';
  this.month = '11';
  this.day = '3';
  this.hour = Math.round(10 + Math.random() * 3).toString();
  this.minute = Math.round(Math.random() * 59).toString();
};

Dusk = function(args) {
  this.type = 'Dusk';
  DateTime.call(this, args);
};

Dusk.prototype = Object.create(DateTime.prototype);

Dusk.prototype.getNextTimeTypes = function() {
  return [
    { time: Dusk,  probability: 0.5 },
    { time: Evening, probability: 0.5 },
  ];
};

Dusk.prototype.init = function() {
  this.year = '2035';
  this.month = '11';
  this.day = '3';
  this.hour = Math.round(16 + Math.random() * 2).toString();
  this.minute = Math.round(Math.random() * 59).toString();
};

Evening = function(args) {
  this.type = 'Evening';
  DateTime.call(this, args);
};

Evening.prototype = Object.create(DateTime.prototype);

Evening.prototype.getNextTimeTypes = function() {
  return [
    { time: Evening, probability: 0.5 },
    { time: Night,    probability: 0.5 },
  ];
};

Evening.prototype.init = function() {
  this.year = '2035';
  this.month = '11';
  this.day = '3';
  this.hour = Math.round(21 + Math.random() * 2).toString();
  this.minute = Math.round(Math.random() * 59).toString();
};

Night = function(args) {
  this.type = 'Night';
  DateTime.call(this, args);
}

Night.prototype = Object.create(DateTime.prototype);

Night.prototype.getNextTimeTypes = function() {
  return [
    { time: Night, probability: 0.5 },
    { time: Dawn,  probability: 0.5 },
  ];
};

Night.prototype.init = function() {
  this.year = '2035';
  this.month = '11';
  this.day = '3';
  this.hour = Math.round(2 + Math.random() * 2).toString();
  this.minute = Math.round(Math.random() * 59).toString();
};
