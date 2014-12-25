(function(){if (typeof collections == 'undefined'){
  collections = {};
}

collections.SquadCollection = new Meteor.Collection('squads');

collections.SquadMemberCollection = new Meteor.Collection('squadMembers');

if (Meteor.isServer) {
  collections.SquadMemberCollection._ensureIndex( { steamId: 1 }, { unique: true } );
}

})();
