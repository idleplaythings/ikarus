Meteor.startup(function() {

  if (collections.ServerQueueCollection.find().fetch().length === 0) {
    collections.ServerQueueCollection.insert({
      queue: [],
      region: 'EU'
    });
  }

  if (collections.ServerCollection.find().fetch().length === 0) {
    //TODO: these should be somewhere else, if this goes open source
    Server.create("Ikarus EU #1", 'hJknqdzmlelpxJs6i#uunyZx');
    Server.create("Ikarus EU #2", 'aetruUXpFkgirf0kevkzns!h');
    Server.create("Ikarus EU #3", 'j#rfzpaeoutftMcfnV3encpM');
    Server.create("Ikarus EU #4", 'plLlpndx#qqgvee0qidctTGp');
    Server.create("Ikarus EU #5", 'NnYqldrnueaAjkabw#jbscb3');
    Server.create("Ikarus EU #6", 'zcghmuulfncYc7vehGYmh!et');
    Server.create("Ikarus EU #7", 'mtuflpsFbsla8Lxaorgvs!nP');
    Server.create("Ikarus EU #8", 'Lpfk8mubtbmusskccvu!cCzC');
  }
});