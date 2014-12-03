(function(){
  'use strict';

  Meteor.methods({
    createSquad: function(name){
      if (! name || name.length < 5) {
        return;
      }

      dic.get('SquadService').createSquad(name);
    }
  });

})();