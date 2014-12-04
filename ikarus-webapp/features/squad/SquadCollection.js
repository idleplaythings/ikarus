
if (typeof collections == 'undefined'){
  collections = {};
}

collections.SquadCollection = new Meteor.Collection("squads");

collections.SquadsOnServerCollection = new Meteor.Collection("squadsOnServers");
