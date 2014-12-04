(function(){
  'use strict';

  Meteor.methods({
    createSquad: function(name){
      if (! name || name.length < 5) {
        return;
      }

      dic.get('SquadService').createSquad(name);
    },

    ChangeStartingLocation: function(squadOnServerId, location){
      var squadOnServerService = dic.get('SquadOnServerService');
      var squadOnServer = squadOnServerService.getSquadOnServerForCurrentPlayer();

      if (squadOnServer._id !== squadOnServerId) {
        throw new Meteor.Error(404, 'Squad on server not found');
      }

      if (squadOnServer.locked) {
        return;
      }

      squadOnServer.startingLocation = location;

      squadOnServerService.save(squadOnServer);
    }

  });

})();