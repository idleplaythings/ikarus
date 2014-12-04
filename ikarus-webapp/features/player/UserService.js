UserService = (function(){
  'use strict';

  function UserService(){

  }

  UserService.prototype.updateUserSquadId = function(user, squadId){
    Meteor.users.update({_id: user._id}, {$set: {squadId: squadId}});
  };

  UserService.prototype.getUserById = function(playerId){
    return docToUser(Meteor.users.findOne({'services.steam.id': playerId}));
  };

  UserService.prototype.getCurrentUser = function(){
    return docToUser(Meteor.user());
  };

  var docToUser = function(doc){
    if (! doc)
      return null;

    try {
      return new User(doc);
    }catch(e){
      return null;
    }
  };

  return UserService;
})();