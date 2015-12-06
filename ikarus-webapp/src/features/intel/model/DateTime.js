MissionDateTime = function MissionDateTime(args) {
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

MissionDateTime.prototype.advance = function() {
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

MissionDateTime.fromDoc = function(doc) {
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

MissionDateTime.getRandom = function() {
  var times = [Dawn, Noon, Dusk, Evening, Night];
  return new times[Math.floor(Math.random() * times.length)]();
};

Dawn = function(args) {
  this.type = 'Dawn';
  MissionDateTime.call(this, args);
}

Dawn.prototype = Object.create(MissionDateTime.prototype);

Dawn.prototype.getNextTimeTypes = function() {
  return [
    { time: Noon, probability: 1.0 },
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
  MissionDateTime.call(this, args);
};

Noon.prototype = Object.create(MissionDateTime.prototype);

Noon.prototype.getNextTimeTypes = function() {
  return [
    { time: Noon, probability: 1.0 }, //Lock time to noon for now
    { time: Dusk, probability: 0.0 },
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
  MissionDateTime.call(this, args);
};

Dusk.prototype = Object.create(MissionDateTime.prototype);

Dusk.prototype.getNextTimeTypes = function() {
  return [
    { time: Night, probability: 0.7 },
    { time: Noon, probability: 0.3 },
  ];
};

Dusk.prototype.init = function() {
  this.year = '2035';
  this.month = '11';
  this.day = '3';
  this.hour = Math.round(16).toString();
  this.minute = Math.round(Math.random() * 59).toString();
};

Evening = function(args) {
  this.type = 'Evening';
  MissionDateTime.call(this, args);
};

Evening.prototype = Object.create(MissionDateTime.prototype);

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
  MissionDateTime.call(this, args);
}

Night.prototype = Object.create(MissionDateTime.prototype);

Night.prototype.getNextTimeTypes = function() {
  return [
    { time: Night, probability: 0.1 },
    { time: Dawn,  probability: 0.9 },
  ];
};

Night.prototype.init = function() {
  this.year = '2035';
  this.month = '11';
  this.day = '3';
  this.hour = Math.round(2 + Math.random() * 2).toString();
  this.minute = Math.round(Math.random() * 59).toString();
};
