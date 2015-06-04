Meteor.methods({
  'createSquad': function() {
    dic.get('SquadController').createNewSquad();
  },

  'leaveSquad': function() {
    dic.get('SquadController').leaveSquad();
  },

  'enterSquadQueue': function() {
    dic.get('SquadController').enterSquadQueue();
  },

  'leaveSquadQueue': function() {
    dic.get('SquadController').leaveSquadQueue();
  },

  'joinSquad': function(squadId) {
    dic.get('SquadController').joinSquad(squadId);
  },

  'reinforceServer': function (serverId) {
    dic.get('SquadController').reinforceServer(serverId);
  }

});
